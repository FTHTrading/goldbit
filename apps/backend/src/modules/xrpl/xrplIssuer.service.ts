import { Wallet, Payment, AccountLinesRequest, GatewayBalancesRequest } from 'xrpl';
import BigNumber from 'bignumber.js';
import { env } from '../../config/env';
import { CONSTANTS } from '../../config/constants';
import { XrplClientManager } from './xrplClient';
import { logger } from '../../utils/logger';

export interface XrplMintResult {
  txHash: string;
  deliveredAmountMg: string;
  recipientAddress: string;
  ledgerIndex: number;
  engineResult: string;
}

export class XrplIssuerService {
  /**
   * Fetches circulating supply of XAU_MG directly from cold issuer gateway obligations.
   */
  public static async fetchCirculatingSupplyMg(): Promise<BigNumber> {
    const client = await XrplClientManager.getClient();

    try {
      const request: GatewayBalancesRequest = {
        command: 'gateway_balances',
        account: env.XRPL_COLD_ISSUER_ADDRESS,
        ledger_index: 'validated',
      };

      const response = await client.request(request);
      const obligations = response.result.obligations;

      // Currency may appear as ASCII XAU_MG or 40-char Hex
      const assetKey =
        obligations?.[env.XRPL_ASSET_CODE_TEXT] ||
        obligations?.[env.XRPL_ASSET_CODE_HEX] ||
        '0';

      const supply = new BigNumber(assetKey);
      logger.debug(
        { coldIssuer: env.XRPL_COLD_ISSUER_ADDRESS, circulatingMg: supply.toFixed(6) },
        'Queried XRPL gateway obligations for XAU_MG'
      );
      return supply;
    } catch (err) {
      logger.error({ err }, 'Failed to query XRPL gateway_balances. Defaulting to 0 for fallback check.');
      return new BigNumber(0);
    }
  }

  /**
   * Verifies that the recipient account has established a trustline for XAU_MG with sufficient limit.
   */
  public static async verifyTrustline(
    recipientAddress: string,
    requiredAmountMg: BigNumber
  ): Promise<boolean> {
    const client = await XrplClientManager.getClient();

    try {
      const request: AccountLinesRequest = {
        command: 'account_lines',
        account: recipientAddress,
        peer: env.XRPL_COLD_ISSUER_ADDRESS,
        ledger_index: 'validated',
      };

      const response = await client.request(request);
      const lines = response.result.lines;

      const matchingLine = lines.find(
        (line) =>
          line.currency === env.XRPL_ASSET_CODE_TEXT ||
          line.currency === env.XRPL_ASSET_CODE_HEX
      );

      if (!matchingLine) {
        logger.warn(
          { recipientAddress, currency: env.XRPL_ASSET_CODE_TEXT },
          'Recipient has no active trustline for XAU_MG issued by cold issuer'
        );
        return false;
      }

      const limit = new BigNumber(matchingLine.limit);
      const balance = new BigNumber(matchingLine.balance);
      const availableCapacity = limit.minus(balance);

      const hasCapacity = availableCapacity.isGreaterThanOrEqualTo(requiredAmountMg);
      if (!hasCapacity) {
        logger.warn(
          {
            recipientAddress,
            limit: limit.toString(),
            balance: balance.toString(),
            required: requiredAmountMg.toString(),
          },
          'Recipient trustline has insufficient capacity for mint payment'
        );
      }

      return hasCapacity;
    } catch (err) {
      logger.error({ err, recipientAddress }, 'Error checking recipient trustlines');
      return false;
    }
  }

  /**
   * Dispatches micro-gold payment on XRPL from hot issuer key to recipient.
   */
  public static async dispatchMicroGoldPayment(params: {
    recipientAddress: string;
    amountMg: string | BigNumber;
    paymentIntentId: string;
  }): Promise<XrplMintResult> {
    const client = await XrplClientManager.getClient();
    const amountMg = new BigNumber(params.amountMg).toFixed(CONSTANTS.PRECISION.DECIMAL_PLACES_WEIGHT);

    logger.info(
      {
        recipient: params.recipientAddress,
        amountMg,
        intentId: params.paymentIntentId,
      },
      'Initiating XRPL Payment for micro-gold allocation...'
    );

    // In dev / test environment without live funded secret, generate or simulate transaction
    if (env.XRPL_HOT_ISSUER_SECRET.startsWith('sEdVxxxx') || env.NODE_ENV === 'test') {
      logger.warn('Mocking XRPL transaction submission (Demo/Dev Hot Key configured)');
      return {
        txHash: `XRPL_${Date.now()}_${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
        deliveredAmountMg: amountMg,
        recipientAddress: params.recipientAddress,
        ledgerIndex: 89451203,
        engineResult: 'tesSUCCESS',
      };
    }

    const hotWallet = Wallet.fromSecret(env.XRPL_HOT_ISSUER_SECRET);

    // Construct Issued Currency Payment transaction
    const paymentTx: Payment = {
      TransactionType: 'Payment',
      Account: hotWallet.classicAddress,
      Destination: params.recipientAddress,
      Amount: {
        currency: env.XRPL_ASSET_CODE_HEX,
        issuer: env.XRPL_COLD_ISSUER_ADDRESS,
        value: amountMg,
      },
      Memos: [
        {
          Memo: {
            MemoType: Buffer.from('unykorn/gold_cer', 'utf-8').toString('hex').toUpperCase(),
            MemoData: Buffer.from(JSON.stringify({ intentId: params.paymentIntentId }), 'utf-8')
              .toString('hex')
              .toUpperCase(),
          },
        },
      ],
    };

    const prepared = await client.autofill(paymentTx);
    const signed = hotWallet.sign(prepared);

    logger.info({ txBlobHash: signed.hash }, 'Submitting signed XRPL payment to ledger consensus...');
    const result = await client.submitAndWait(signed.tx_blob);

    const meta = result.result.meta;
    const engineResult = typeof meta === 'object' && meta !== null && 'TransactionResult' in meta
      ? (meta as { TransactionResult: string }).TransactionResult
      : 'UNKNOWN';

    if (engineResult !== 'tesSUCCESS') {
      throw new Error(`XRPL transaction failed on-chain with result code: ${engineResult}`);
    }

    return {
      txHash: result.result.hash,
      deliveredAmountMg: amountMg,
      recipientAddress: params.recipientAddress,
      ledgerIndex: result.result.ledger_index || 0,
      engineResult,
    };
  }
}
