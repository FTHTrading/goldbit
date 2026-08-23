import BigNumber from 'bignumber.js';
import { PorPublisher } from '../por/porPublisher';
import { CryptoSigner } from '../../utils/cryptoSigner';
import { SanitizedProofOfReservePayload } from '../por/porSanitizer';
import { logger } from '../../utils/logger';

export class ReportVerifier {
  /**
   * Fetches latest PoR payload and cryptographically verifies the attestation signature.
   */
  public static async fetchAndVerifyLatestPoR(): Promise<{
    isValid: boolean;
    porPayload: SanitizedProofOfReservePayload | null;
    vaultFineMg: BigNumber;
    circulatingMg: BigNumber;
    deltaSurplusMg: BigNumber;
    error?: string;
  }> {
    const payload = PorPublisher.getLatestCachedPoR();

    if (!payload) {
      return {
        isValid: false,
        porPayload: null,
        vaultFineMg: new BigNumber(0),
        circulatingMg: new BigNumber(0),
        deltaSurplusMg: new BigNumber(0),
        error: 'No Proof-of-Reserve report available in memory cache. Audit cycle may be pending.',
      };
    }

    const canonicalData = JSON.stringify({
      vaultFineMg: payload.summary.totalVaultFineMg,
      circulatingMg: payload.summary.totalCirculatingXrplMg,
      pendingMintsMg: payload.summary.pendingMintsMg,
      pendingBurnsMg: payload.summary.pendingBurnsMg,
      deltaSurplusMg: payload.summary.deltaSurplusMg,
      isPassed: payload.summary.isFullyBacked,
      timestamp: payload.timestamp,
    });

    const isSigValid = CryptoSigner.verifyAttestation(
      canonicalData,
      payload.cryptographicAttestation.signatureHex
    );

    if (!isSigValid) {
      logger.error('PoR signature validation failed during Chainlink bridge query');
      return {
        isValid: false,
        porPayload: payload,
        vaultFineMg: new BigNumber(payload.summary.totalVaultFineMg),
        circulatingMg: new BigNumber(payload.summary.totalCirculatingXrplMg),
        deltaSurplusMg: new BigNumber(payload.summary.deltaSurplusMg),
        error: 'Cryptographic attestation signature is invalid',
      };
    }

    return {
      isValid: true,
      porPayload: payload,
      vaultFineMg: new BigNumber(payload.summary.totalVaultFineMg),
      circulatingMg: new BigNumber(payload.summary.totalCirculatingXrplMg),
      deltaSurplusMg: new BigNumber(payload.summary.deltaSurplusMg),
    };
  }
}
