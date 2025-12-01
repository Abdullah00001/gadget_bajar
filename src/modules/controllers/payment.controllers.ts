import { type Request, type Response, type NextFunction } from 'express';
import asyncHandler from '@/utils/asyncHandler.utils';
import PaymentServices from '@/modules/services/payment.services';

const { processPaymentPaypalWebhook, processPaymentStripeWebhook } =
  PaymentServices;

const PaymentControllers = {
  handlePaypalWebhook: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const data = req.body;
      await processPaymentPaypalWebhook(data);
      res.status(200).json({
        success: true,
        message: 'Payment successful,Your order on processing',
      });
      return;
    }
  ),
  handleStripeWebhook: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const data = req.body;
      await processPaymentStripeWebhook(data);
      res.status(200).json({
        success: true,
        message: 'Payment successful,Your order on processing',
      });
      return;
    }
  ),
};

export default PaymentControllers;
