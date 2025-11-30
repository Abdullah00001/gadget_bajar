import { Router } from 'express';
import AuthRoutes from '@/routes/v1/auth.routes';
import ChatBot from '@/routes/v1/chatBot.routes';
import Order from '@/routes/v1/order.routes';
import Payment from '@/routes/v1/payment.routes';

const routes: Router[] = [AuthRoutes, ChatBot, Order, Payment];

const v1Routes = Router();

routes.forEach((route) => v1Routes.use(route));

export default v1Routes;
