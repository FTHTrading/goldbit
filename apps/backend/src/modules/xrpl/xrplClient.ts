import { Client } from 'xrpl';
import { env } from '../../config/env';
import { logger } from '../../utils/logger';

export class XrplClientManager {
  private static instance: Client | null = null;
  private static isConnecting: boolean = false;

  /**
   * Retrieves or initializes the singleton XRPL WebSocket Client.
   */
  public static async getClient(): Promise<Client> {
    if (this.instance && this.instance.isConnected()) {
      return this.instance;
    }

    if (!this.instance) {
      this.instance = new Client(env.XRPL_RPC_URL, {
        connectionTimeout: 10000,
      });

      this.instance.on('error', (errorCode, errorMessage) => {
        logger.error({ errorCode, errorMessage }, 'XRPL Client connection error');
      });

      this.instance.on('disconnected', (code) => {
        logger.warn({ code }, 'XRPL Client disconnected. Will reconnect on next request.');
      });
    }

    if (!this.instance.isConnected() && !this.isConnecting) {
      this.isConnecting = true;
      try {
        logger.info({ rpcUrl: env.XRPL_RPC_URL }, 'Connecting to XRPL node...');
        await this.instance.connect();
        logger.info('Connected to XRPL node successfully');
      } catch (err) {
        logger.error({ err }, 'Failed to connect to XRPL node');
        throw err;
      } finally {
        this.isConnecting = false;
      }
    }

    return this.instance;
  }

  /**
   * Safely disconnects the XRPL client during graceful shutdown.
   */
  public static async disconnect(): Promise<void> {
    if (this.instance && this.instance.isConnected()) {
      await this.instance.disconnect();
      logger.info('XRPL client disconnected gracefully');
      this.instance = null;
    }
  }
}
