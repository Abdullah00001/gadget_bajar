import prisma from '@/configs/database.config';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@/const';
import { TCreateOrder, TOrderItem } from '@/modules/schemas/order.schema';
import {
  createMockPaypalOrder,
  createMockStripePaymentIntent,
} from '@/utils/mockPaymentClient.utils';

const OrderServices = {
  processCreateOrder: async ({
    items,
    paymentMethod,
    userId,
  }: TCreateOrder) => {
    try {
      console.log(items, paymentMethod, userId);
      const totalAmount = items.reduce((sum: number, item: TOrderItem) => {
        const { price, quantity } = item;
        return sum + price * quantity;
      }, 0);
      const newOrder = await prisma.order.create({
        data: {
          items,
          paymentMethod,
          totalAmount,
          orderStatus: OrderStatus.Pending,
          paymentStatus: PaymentStatus.Pending,
          userId,
        },
      });
      if (paymentMethod === PaymentMethod.Stripe) {
        const data = createMockStripePaymentIntent(newOrder.id, totalAmount);
        return data;
      } else if (paymentMethod === PaymentMethod.Paypal) {
        const data = createMockPaypalOrder(newOrder.id, totalAmount);
        return data;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in create order service');
    }
  },
};

export default OrderServices;
