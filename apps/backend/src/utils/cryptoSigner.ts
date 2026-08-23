import crypto from 'crypto';
import { env } from '../config/env';
import { logger } from './logger';

export class CryptoSigner {
  /**
   * Generates an HMAC-SHA256 hex digest for a payload given a secret key.
   */
  public static generateHmacSha256(payload: string | Buffer, secret: string): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  /**
   * Timing-safe verification of HMAC-SHA256 signature.
   */
  public static verifyHmacSha256(payload: string | Buffer, signatureHex: string, secret: string): boolean {
    try {
      const expectedHmac = Buffer.from(this.generateHmacSha256(payload, secret), 'hex');
      const actualHmac = Buffer.from(signatureHex.replace(/^sha256=/, ''), 'hex');

      if (expectedHmac.length !== actualHmac.length) {
        return false;
      }
      return crypto.timingSafeEqual(expectedHmac, actualHmac);
    } catch (err) {
      logger.warn({ err }, 'Error during HMAC verification');
      return false;
    }
  }

  /**
   * Hashes and salts a physical bar serial number to generate a secure, sanitized public identifier.
   */
  public static maskBarSerial(serialNumber: string, salt: string = env.POR_HMAC_SALT_KEY): string {
    const hash = crypto.createHmac('sha256', salt).update(serialNumber).digest('hex');
    return `BAR-MASKED-${hash.slice(0, 16).toUpperCase()}`;
  }

  /**
   * Signs arbitrary JSON/string data using an ECDSA Private Key (PEM format).
   */
  public static signAttestation(data: string, privateKeyPem?: string): string {
    const key = privateKeyPem || env.POR_SIGNING_PRIVATE_KEY_PEM;
    if (!key) {
      // Fallback to ephemeral keypair for dev environment
      logger.warn('POR_SIGNING_PRIVATE_KEY_PEM not set. Signing with deterministic mock signature.');
      return crypto.createHash('sha256').update(`MOCK_SIG:${data}`).digest('hex');
    }

    const sign = crypto.createSign('SHA256');
    sign.update(data);
    sign.end();
    return sign.sign(key, 'hex');
  }

  /**
   * Verifies an ECDSA attestation signature against public key PEM.
   */
  public static verifyAttestation(data: string, signatureHex: string, publicKeyPem?: string): boolean {
    const key = publicKeyPem || env.POR_PUBLIC_KEY_PEM;
    if (!key) {
      // Dev mode check for mock signature
      const expectedMock = crypto.createHash('sha256').update(`MOCK_SIG:${data}`).digest('hex');
      return signatureHex === expectedMock;
    }

    try {
      const verify = crypto.createVerify('SHA256');
      verify.update(data);
      verify.end();
      return verify.verify(key, signatureHex, 'hex');
    } catch (err) {
      logger.error({ err }, 'Failed to verify attestation signature');
      return false;
    }
  }
}
