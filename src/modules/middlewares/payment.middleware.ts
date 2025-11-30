import prisma from '@/configs/database.config';
import { PaymentStatus } from '@/const';
import asyncHandler from '@/utils/asyncHandler.utils';
import { verifyMockWebhook } from '@/utils/mockPaymentClient.utils';
import { type Request, type Response, type NextFunction } from 'express';

const PaymentMiddleware = {
  checkWebhookSignature: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { webhookSignature, orderId } = req.body;
      const { valid, data } = verifyMockWebhook(webhookSignature);
      if (!valid && !data) {
        await prisma.order.update({
          where: { id: orderId },
          data: { paymentStatus: PaymentStatus.Failed },
        });
        res.status(401).json({
          success: false,
          message: 'Unauthorized Request: Invalid or expired token.',
        });
        return;
      }
      next();
    }
  ),
};

export default PaymentMiddleware;
