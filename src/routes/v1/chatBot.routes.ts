import { Router } from 'express';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import { chatBotSchema } from '@/modules/schemas/chatBot.schema';
import ChatBotControllers from '@/modules/controllers/chatBot.controllers';

const router = Router();

const { checkAccessToken, checkRole } = AuthMiddleware;
const { handleChat } = ChatBotControllers;

// Chat Bot Endpoint
router
  .route('/chatbot')
  .post(
    checkAccessToken,
    checkRole,
    validateRequest(chatBotSchema),
    handleChat
  );

export default router;
