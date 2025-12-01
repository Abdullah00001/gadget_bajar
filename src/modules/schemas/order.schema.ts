import { OrderStatus } from '@/const';
import { z } from 'zod';

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        title: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
  paymentMethod: z.string(),
});

type TCreateOrderPayload = z.infer<typeof createOrderSchema>;
export type TOrderItem = TCreateOrderPayload['items'][number];

export type TCreateOrder = TCreateOrderPayload & {
  userId: string;
};

export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(Object.values(OrderStatus) as [string, ...string[]]),
});

export type TUpdateOrderStatusPayload = z.infer<typeof updateOrderStatusSchema>;

export type TUpdateOrder = TUpdateOrderStatusPayload & {
  orderId: string;
};

export default createOrderSchema;
