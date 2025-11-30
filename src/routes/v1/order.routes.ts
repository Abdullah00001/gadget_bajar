import { Router } from 'express';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import createOrderSchema from '@/modules/schemas/order.schema';
import OrderControllers from '@/modules/controllers/order.controllers';

const router = Router();

const { checkAccessToken, checkRole } = AuthMiddleware;
const { handleCreateOrder } = OrderControllers;

// Create Order Endpoint
router
  .route('/order')
  .post(
    validateRequest(createOrderSchema),
    checkAccessToken,
    checkRole,
    handleCreateOrder
  );

export default router;
