import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { IntentService } from './intent.service';

const createQuoteSchema = z.object({
  userId: z.string().min(1, 'userId is required'),
  amountUsd: z.union([z.number(), z.string()]).optional(),
  fiatAmountUsd: z.union([z.number(), z.string()]).optional(),
  customerXrplAddress: z.string().optional(),
  recipientXrplAddress: z.string().optional(),
  paymentAsset: z.string().optional(),
  depositCoin: z.string().optional(),
}).refine(
  (data) => (data.amountUsd !== undefined && Number(data.amountUsd) > 1.50) ||
            (data.fiatAmountUsd !== undefined && Number(data.fiatAmountUsd) > 1.50),
  { message: 'Amount must be greater than $1.50 platform tech fee' }
);

export class IntentController {
  /**
   * POST /api/v1/intent/gold/quote
   */
  public static async createQuote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = createQuoteSchema.parse(req.body);
      const quote = await IntentService.createQuoteIntent({
        userId: validated.userId,
        amountUsd: validated.amountUsd,
        fiatAmountUsd: validated.fiatAmountUsd,
        customerXrplAddress: validated.customerXrplAddress,
        recipientXrplAddress: validated.recipientXrplAddress,
        paymentAsset: validated.paymentAsset,
        depositCoin: validated.depositCoin,
      });

      // Directly return expected JSON object
      res.status(200).json(quote);
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/v1/intent/gold/:id
   */
  public static async getIntent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const intent = await IntentService.getIntentById(req.params.id);
      if (!intent) {
        res.status(404).json({
          error: 'NOT_FOUND',
          message: `Payment intent ${req.params.id} not found`,
        });
        return;
      }

      res.status(200).json(intent);
    } catch (err) {
      next(err);
    }
  }
}
