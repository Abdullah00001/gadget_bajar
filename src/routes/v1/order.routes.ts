import { Router } from 'express';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import createOrderSchema, {
  updateOrderStatusSchema,
} from '@/modules/schemas/order.schema';
import OrderControllers from '@/modules/controllers/order.controllers';

const router = Router();

const { checkAccessToken, checkRole } = AuthMiddleware;
const {
  handleCreateOrder,
  handleAdminRetrieveOrders,
  handleAdminUpdateOrderStatus,
} = OrderControllers;

// Create Order Endpoint
router
  .route('/order')
  .post(
    validateRequest(createOrderSchema),
    checkAccessToken,
    checkRole,
    handleCreateOrder
  );

router
  .route('/admin/order')
  .get(checkAccessToken, checkRole, handleAdminRetrieveOrders);

router
  .route('/admin/order/:id')
  .patch(
    validateRequest(updateOrderStatusSchema),
    checkAccessToken,
    checkRole,
    handleAdminUpdateOrderStatus
  );

export default router;
