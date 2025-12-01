import prisma from '@/configs/database.config';
import { getIO } from '@/configs/socket.configs';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@/const';
import {
  TCreateOrder,
  TOrderItem,
  TUpdateOrder,
} from '@/modules/schemas/order.schema';
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
  processAdminRetrieveOrders: async () => {
    try {
      const data = await prisma.order.findMany();
      return data;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in admin retrieve order service');
    }
  },
  processAdminChangeOrderStatus: async ({
    orderId,
    orderStatus,
  }: TUpdateOrder) => {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { orderStatus },
      });
      const io = getIO();
      io.to(`user:${order.userId}`).emit('orderUpdate', {
        orderId: order.id,
        orderStatus: order.orderStatus,
        message: `Order ${orderStatus}`,
      });
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in admin retrieve order service');
    }
  },
};

export default OrderServices;
