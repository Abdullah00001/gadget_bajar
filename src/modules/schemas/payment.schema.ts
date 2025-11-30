import { z } from 'zod';

const paymentIntentSucceededSchema = z.object({
  event: z.string(),
  orderId: z.string(),
  paymentId: z.string().min(1),
  amount: z.number().int().positive(),
  webhookSignature: z.string(),
});

export type TPaymentIntentSucceeded = z.infer<
  typeof paymentIntentSucceededSchema
>;

export default paymentIntentSucceededSchema;
