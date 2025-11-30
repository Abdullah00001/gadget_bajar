import prisma from '@/configs/database.config';
import redisClient from '@/configs/redis.config';
import { OtpUtilsSingleton } from '@/singletons/otp.utils.singleton';
import asyncHandler from '@/utils/asyncHandler.utils';
import PasswordUtils from '@/utils/password.utils';
import { type Request, type Response, type NextFunction } from 'express';

const { comparePassword } = PasswordUtils;

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
  isUserExist: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email } = req.body;
      const isUserExist = await prisma.user.findFirst({ where: { email } });
      if (!isUserExist) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
      }
      const { accountStatus, id, name, password, role } = isUserExist;
      req.user = { accountStatus, id, name, password, role, email };
      next();
    }
  ),
  checkSignupOtp: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, otp } = req.body;
      const hashedOtp = await redisClient.get(`user:otp:${email}`);
      if (!hashedOtp) {
        res
          .status(400)
          .json({ success: false, message: 'Otp has been expired' });
        return;
      }
      const isMatched = OtpUtilsSingleton().compareOtp({ hashedOtp, otp });
      if (!isMatched) {
        res.status(400).json({ success: false, message: 'Invalid otp' });
        return;
      }
      await redisClient.del(`user:otp:${email}`);
      next();
    }
  ),
  checkPassword: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { password } = req.body;
      const hashedPassword = req.user.password;
      const isMatched = await comparePassword(password, hashedPassword);
      if (!isMatched) {
        res.status(400).json({ success: false, message: 'Invalid credential' });
        return;
      }
      next();
    }
  ),
};

export default AuthMiddleware;
