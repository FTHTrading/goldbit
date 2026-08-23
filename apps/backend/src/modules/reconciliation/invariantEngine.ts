import { PrismaClient } from '@prisma/client';
import BigNumber from 'bignumber.js';
import { GoldMath } from '../../utils/math';
import { BullionClient } from '../wholesale/bullionClient';
import { XrplIssuerService } from '../xrpl/xrplIssuer.service';
import { CryptoSigner } from '../../utils/cryptoSigner';
import { logger } from '../../utils/logger';
import { env } from '../../config/env';

const prisma = new PrismaClient();

export interface InvariantEvaluationResult {
  isPassed: boolean;
  vaultFineMg: string;
  circulatingMg: string;
  pendingMintsMg: string;
  pendingBurnsMg: string;
  effectiveOutstandingMg: string;
  deltaSurplusMg: string;
  timestamp: string;
  attestationSigHex: string;
  failureReason?: string;
}

export class InvariantEngine {
  /**
   * Calculates pending unminted milligrams from active settled/executed payment intents.
   */
  public static async getPendingMintsMg(): Promise<BigNumber> {
    const pending = await prisma.paymentIntent.findMany({
      where: {
        status: { in: ['SETTLED', 'EXECUTED'] },
      },
      select: { targetWeightMg: true },
    });

    return pending.reduce((acc, curr) => acc.plus(new BigNumber(curr.targetWeightMg.toString())), new BigNumber(0));
  }

  /**
   * Calculates pending burns from active unreleased physical redemptions.
   */
  public static async getPendingBurnsMg(): Promise<BigNumber> {
    const pending = await prisma.redemptionRequest.findMany({
      where: { status: 'LOCKED' },
      select: { requestedWeightMg: true },
    });

    return pending.reduce((acc, curr) => acc.plus(new BigNumber(curr.requestedWeightMg.toString())), new BigNumber(0));
  }

  /**
   * Evaluates the hard reserve invariant across vault inventory, XRPL ledger, and internal state.
   */
  public static async evaluateInvariant(): Promise<InvariantEvaluationResult> {
    logger.info('Evaluating hard reserve invariant formula...');

    // 1. Fetch live telemetry from Vault Depository
    const vaultReport = await BullionClient.fetchVaultInventory();
    const vaultFineMg = vaultReport.totalFineMg;

    // 2. Fetch live circulating gateway supply on XRPL
    const circulatingMg = await XrplIssuerService.fetchCirculatingSupplyMg();

    // 3. Aggregate pending mints and burns from DB state
    const pendingMintsMg = await this.getPendingMintsMg();
    const pendingBurnsMg = await this.getPendingBurnsMg();

    // 4. Run GoldMath verification
    const evalResult = GoldMath.evaluateReserveInvariant({
      vaultedFineWeightMg: vaultFineMg,
      circulatingSupplyMg: circulatingMg,
      pendingMintsMg,
      pendingBurnsMg,
      bufferMg: env.INVARIANT_BUFFER_MG,
    });

    const timestamp = new Date().toISOString();
    let failureReason: string | undefined = undefined;

    if (!evalResult.isPassed) {
      failureReason = `Reserve invariant breached! Vault Fine (${evalResult.vaultFineMg.toFixed(
        2
      )} mg) < Effective Outstanding (${evalResult.effectiveOutstandingMg.toFixed(2)} mg). Deficit: ${evalResult.deltaSurplusMg.abs().toFixed(2)} mg`;

      logger.error(
        {
          vaultFineMg: evalResult.vaultFineMg.toFixed(6),
          circulatingMg: evalResult.circulatingMg.toFixed(6),
          pendingMintsMg: evalResult.pendingMintsMg.toFixed(6),
          pendingBurnsMg: evalResult.pendingBurnsMg.toFixed(6),
          deltaSurplusMg: evalResult.deltaSurplusMg.toFixed(6),
        },
        '[CRITICAL INVARIANT BREACH] Tripping fail-closed circuit breaker!'
      );

      // Lock system mints immediately in database
      await prisma.systemControl.upsert({
        where: { id: 'SYSTEM_DEFAULT' },
        create: {
          id: 'SYSTEM_DEFAULT',
          mintLocked: true,
          lockReason: failureReason,
          lastEvaluatedAt: new Date(),
        },
        update: {
          mintLocked: true,
          lockReason: failureReason,
          lastEvaluatedAt: new Date(),
        },
      });
    }

    // 5. Generate cryptographic attestation signature
    const canonicalPayload = JSON.stringify({
      vaultFineMg: evalResult.vaultFineMg.toFixed(6),
      circulatingMg: evalResult.circulatingMg.toFixed(6),
      pendingMintsMg: evalResult.pendingMintsMg.toFixed(6),
      pendingBurnsMg: evalResult.pendingBurnsMg.toFixed(6),
      deltaSurplusMg: evalResult.deltaSurplusMg.toFixed(6),
      isPassed: evalResult.isPassed,
      timestamp,
    });

    const attestationSigHex = CryptoSigner.signAttestation(canonicalPayload);

    // 6. Record audit entry in DB
    await prisma.reconciliationAudit.create({
      data: {
        timestamp: new Date(timestamp),
        vaultFineMg: evalResult.vaultFineMg.toFixed(6),
        xrplCirculatingMg: evalResult.circulatingMg.toFixed(6),
        pendingMintsMg: evalResult.pendingMintsMg.toFixed(6),
        pendingBurnsMg: evalResult.pendingBurnsMg.toFixed(6),
        deltaSurplusMg: evalResult.deltaSurplusMg.toFixed(6),
        isPassed: evalResult.isPassed,
        attestationSigHex,
        failureReason,
      },
    });

    return {
      isPassed: evalResult.isPassed,
      vaultFineMg: evalResult.vaultFineMg.toFixed(6),
      circulatingMg: evalResult.circulatingMg.toFixed(6),
      pendingMintsMg: evalResult.pendingMintsMg.toFixed(6),
      pendingBurnsMg: evalResult.pendingBurnsMg.toFixed(6),
      effectiveOutstandingMg: evalResult.effectiveOutstandingMg.toFixed(6),
      deltaSurplusMg: evalResult.deltaSurplusMg.toFixed(6),
      timestamp,
      attestationSigHex,
      failureReason,
    };
  }
}
