import { type Request, type Response, type NextFunction } from 'express';
import asyncHandler from '@/utils/asyncHandler.utils';
import OrderServices from '@/modules/services/order.services';

const { processCreateOrder } = OrderServices;

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
};

export default OrderControllers;
