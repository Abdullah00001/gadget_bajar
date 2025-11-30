import prisma from '@/configs/database.config';
import { getIO } from '@/configs/socket.configs';
import { OrderStatus, PaymentStatus } from '@/const';
import { TPaymentIntentSucceeded } from '@/modules/schemas/payment.schema';

const PaymentServices = {
  processPaymentStripeWebhook: async ({ orderId }: TPaymentIntentSucceeded) => {
    try {
      const result = await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.Paid,
          orderStatus: OrderStatus.Processing,
        },
      });
      const io = getIO();
      io.to(`user:${result.userId}`).emit('orderUpdate', {
        orderId: result.id,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        message: 'Payment successful',
      });
      return;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(
        'Unknown error occurred in payment stripe webhook service'
      );
    }
  },
  processPaymentPaypalWebhook: async ({ orderId }: TPaymentIntentSucceeded) => {
    try {
      const result = await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: PaymentStatus.Paid,
          orderStatus: OrderStatus.Processing,
        },
      });
      const io = getIO();
      io.to(`user:${result.userId}`).emit('orderUpdate', {
        orderId: result.id,
        paymentStatus: 'paid',
        orderStatus: 'processing',
        message: 'Payment successful',
      });
      return;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error(
        'Unknown error occurred in payment paypal webhook service'
      );
    }
  },
};

export default PaymentServices;
