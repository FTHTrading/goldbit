import { CryptoSigner } from '../src/utils/cryptoSigner';

describe('CryptoSigner HMAC and Masking Logic', () => {
  const testSecret = '0123456789abcdef0123456789abcdef';
  const testPayload = JSON.stringify({
    event: 'transfer',
    walletId: 'w123',
    txid: '0xabc',
  });

  it('generates deterministic HMAC-SHA256 digest', () => {
    const signature1 = CryptoSigner.generateHmacSha256(testPayload, testSecret);
    const signature2 = CryptoSigner.generateHmacSha256(testPayload, testSecret);
    expect(signature1).toBe(signature2);
    expect(signature1.length).toBe(64);
  });

  it('verifies valid HMAC-SHA256 signature correctly', () => {
    const signature = CryptoSigner.generateHmacSha256(testPayload, testSecret);
    const isValid = CryptoSigner.verifyHmacSha256(testPayload, signature, testSecret);
    expect(isValid).toBe(true);
  });

  it('rejects tampered payload during HMAC verification', () => {
    const signature = CryptoSigner.generateHmacSha256(testPayload, testSecret);
    const tamperedPayload = testPayload.replace('w123', 'w456');
    const isValid = CryptoSigner.verifyHmacSha256(tamperedPayload, signature, testSecret);
    expect(isValid).toBe(false);
  });

  it('masks physical bar serials deterministically with salt', () => {
    const rawSerial = 'BAR-LBMA-449102-FRAC';
    const masked1 = CryptoSigner.maskBarSerial(rawSerial, 'salt123');
    const masked2 = CryptoSigner.maskBarSerial(rawSerial, 'salt123');
    expect(masked1).toBe(masked2);
    expect(masked1.startsWith('BAR-MASKED-')).toBe(true);
  });
});
