import cron from 'node-cron';
import { InvariantEngine } from './invariantEngine';
import { PorSanitizer } from '../por/porSanitizer';
import { PorPublisher } from '../por/porPublisher';
import { logger } from '../../utils/logger';

export class AuditDaemon {
  private static isRunning: boolean = false;

  /**
   * Executes a complete reconciliation and Proof-of-Reserves publication cycle.
   */
  public static async runAuditCycle(): Promise<void> {
    if (this.isRunning) {
      logger.warn('Audit cycle is already executing. Skipping concurrent trigger.');
      return;
    }

    this.isRunning = true;
    logger.info('Starting daily automated reserve reconciliation audit cycle...');

    try {
      // 1. Evaluate hard invariant
      const evalResult = await InvariantEngine.evaluateInvariant();

      // 2. Generate sanitized PoR payload
      const sanitizedPoR = await PorSanitizer.generateSanitizedPoR(evalResult);

      // 3. Publish to S3 / CDN
      const published = await PorPublisher.publishPoR(sanitizedPoR);

      logger.info(
        {
          isPassed: evalResult.isPassed,
          vaultFineMg: evalResult.vaultFineMg,
          circulatingMg: evalResult.circulatingMg,
          deltaSurplusMg: evalResult.deltaSurplusMg,
          publicUrl: published.publicUrl,
        },
        'Reconciliation audit cycle completed successfully'
      );
    } catch (err) {
      logger.error({ err }, 'Audit daemon encounter an unexpected error during execution cycle');
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Initializes the audit cron job (Runs at midnight UTC: 0 0 * * *).
   */
  public static initCron(): void {
    logger.info('Initializing Audit Daemon cron (0 0 * * * UTC)...');

    cron.schedule('0 0 * * *', async () => {
      logger.info('Scheduled daily reserve audit triggered.');
      await this.runAuditCycle();
    });

    // Run initial baseline check on startup asynchronously
    setTimeout(async () => {
      logger.info('Running startup baseline reserve invariant check...');
      await this.runAuditCycle();
    }, 2000);
  }
}
