import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export async function circuitBreakerGuard(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const control = await prisma.systemControl.findUnique({
      where: { id: 'SYSTEM_DEFAULT' },
    });

    if (control?.mintLocked) {
      logger.error(
        {
          path: req.path,
          method: req.method,
          lockReason: control.lockReason,
          lastEvaluated: control.lastEvaluatedAt,
        },
        '[CIRCUIT_BREAKER_TRIGGERED] Minting operations are currently halted due to reserve invariant lock'
      );

      res.status(409).json({
        error: 'CIRCUIT_BREAKER_TRIGGERED',
        message: 'Minting operations are currently halted by system safety controls.',
        reason: control.lockReason || 'Reserve invariant threshold breached or pending audit verification.',
        timestamp: control.updatedAt,
      });
      return;
    }

    next();
  } catch (error) {
    logger.error({ error }, 'Failed to evaluate circuit breaker guard state');
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Failed to verify system safety controls status.',
    });
  }
}
