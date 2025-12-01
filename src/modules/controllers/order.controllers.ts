import { type Request, type Response, type NextFunction } from 'express';
import asyncHandler from '@/utils/asyncHandler.utils';
import OrderServices from '@/modules/services/order.services';

const {
  processCreateOrder,
  processAdminRetrieveOrders,
  processAdminChangeOrderStatus,
} = OrderServices;

const OrderControllers = {
  handleCreateOrder: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const data = req.body;
      const { id } = req.user;
      const orderData = await processCreateOrder({ ...data, userId: id });
      if (!orderData) {
        res.status(400).json({ message: 'Unsupported payment method' });
        return;
      }
      res.status(201).json({ success: true, data: orderData });
      return;
    }
  ),
  handleAdminRetrieveOrders: asyncHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const orderData = await processAdminRetrieveOrders();
      res.status(200).json({ success: true, data: orderData });
      return;
    }
  ),
  handleAdminUpdateOrderStatus: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: 'order id missing' });
        return;
      }
      const { orderStatus } = req.body;
      await processAdminChangeOrderStatus({ orderId: id, orderStatus });
      res.status(200).json({ success: true, message: 'order status changed' });
      return;
    }
  ),
};

export default OrderControllers;
