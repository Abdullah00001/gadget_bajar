import prisma from '@/configs/database.config';
import asyncHandler from '@/utils/asyncHandler.utils';
import { type Request, type Response, type NextFunction } from 'express';

const AuthMiddleware = {
  isSignupUserExist: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const isUserExist = await prisma.user.findFirst({ where: { email } });
      if (isUserExist) {
        res.status(409).json({ success: false, message: 'User already exist' });
        return;
      }
      next();
    }
  ),
};

export default AuthMiddleware;
