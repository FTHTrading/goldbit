import BigNumber from 'bignumber.js';
import { CryptoSigner } from '../../utils/cryptoSigner';
import { InvariantEvaluationResult } from '../reconciliation/invariantEngine';
import { BullionClient } from '../wholesale/bullionClient';

export interface SanitizedBarRecord {
  maskedBarSerial: string;
  grossWeightGrams: string;
  purity: string;
  fineWeightMg: string;
  subpoolId: string;
  depository: string;
  receiptId: string;
}

export interface SanitizedProofOfReservePayload {
  reportVersion: string;
  program: string;
  auditor: string;
  timestamp: string;
  summary: {
    totalVaultFineMg: string;
    totalCirculatingXrplMg: string;
    pendingMintsMg: string;
    pendingBurnsMg: string;
    deltaSurplusMg: string;
    reserveRatioPct: string;
    isFullyBacked: boolean;
  };
  depositoryAllocations: SanitizedBarRecord[];
  cryptographicAttestation: {
    algorithm: string;
    publicKeyPemPreview: string;
    signatureHex: string;
  };
}

export class PorSanitizer {
  /**
   * Generates a sanitized public Proof of Reserves JSON payload.
   */
  public static async generateSanitizedPoR(
    evalResult: InvariantEvaluationResult
  ): Promise<SanitizedProofOfReservePayload> {
    const vaultReport = await BullionClient.fetchVaultInventory();

    const sanitizedBars: SanitizedBarRecord[] = vaultReport.allocatedBars.map((bar) => ({
      maskedBarSerial: CryptoSigner.maskBarSerial(bar.barSerial),
      grossWeightGrams: bar.grossGrams.toFixed(6),
      purity: bar.purity.toFixed(6),
      fineWeightMg: bar.fineMg.toFixed(6),
      subpoolId: bar.subpoolId,
      depository: vaultReport.depositoryName,
      receiptId: bar.receiptId,
    }));

    const vaultFine = new BigNumber(evalResult.vaultFineMg);
    const circulating = new BigNumber(evalResult.circulatingMg);
    const effectiveOutstanding = new BigNumber(evalResult.effectiveOutstandingMg);

    const reserveRatioPct = effectiveOutstanding.isZero()
      ? '100.00'
      : vaultFine.dividedBy(effectiveOutstanding).multipliedBy(100).toFixed(2);

    const payload: SanitizedProofOfReservePayload = {
      reportVersion: '2.0.0-RWA',
      program: 'Unykorn Micro-Gold CER Rails (LBMA 99.99%)',
      auditor: 'Unykorn Automated Depository & Ledger Invariant Oracle',
      timestamp: evalResult.timestamp,
      summary: {
        totalVaultFineMg: evalResult.vaultFineMg,
        totalCirculatingXrplMg: evalResult.circulatingMg,
        pendingMintsMg: evalResult.pendingMintsMg,
        pendingBurnsMg: evalResult.pendingBurnsMg,
        deltaSurplusMg: evalResult.deltaSurplusMg,
        reserveRatioPct,
        isFullyBacked: evalResult.isPassed,
      },
      depositoryAllocations: sanitizedBars,
      cryptographicAttestation: {
        algorithm: 'ECDSA-SHA256',
        publicKeyPemPreview: 'Unykorn Enterprise PoR Master Attestation Key',
        signatureHex: evalResult.attestationSigHex,
      },
    };

    return payload;
  }
}
