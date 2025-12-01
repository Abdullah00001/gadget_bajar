import validateRequest from '@/middlewares/validation.middlewares';
import PaymentControllers from '@/modules/controllers/payment.controllers';
import PaymentMiddleware from '@/modules/middlewares/payment.middleware';
import paymentIntentSucceededSchema from '@/modules/schemas/payment.schema';
import { Router } from 'express';

const router = Router();

const { handlePaypalWebhook, handleStripeWebhook } = PaymentControllers;
const { checkWebhookSignature } = PaymentMiddleware;
// Create Order Endpoint
router
  .route('/payment/webhook/stripe')
  .post(
    validateRequest(paymentIntentSucceededSchema),
    checkWebhookSignature,
    handleStripeWebhook
  );

router
  .route('/payment/webhook/paypal')
  .post(
    validateRequest(paymentIntentSucceededSchema),
    checkWebhookSignature,
    handlePaypalWebhook
  );

export default router;
