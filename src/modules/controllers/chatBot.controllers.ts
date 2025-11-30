import asyncHandler from '@/utils/asyncHandler.utils';
import { type Request, type Response, type NextFunction } from 'express';
import ChatBotServices from '@/modules/services/chatBot.services';

const { processChat } = ChatBotServices;

const ChatBotControllers = {
  handleChat: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { message } = req.body;
      const { id } = req.user;
      const reply = await processChat({ message, userId: id });
      res.status(200).json({ success: true, reply });
      return;
    }
  ),
};

export default ChatBotControllers;
