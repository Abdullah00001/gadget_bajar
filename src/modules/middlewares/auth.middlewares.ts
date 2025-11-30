import prisma from '@/configs/database.config';
import redisClient from '@/configs/redis.config';
import { OtpUtilsSingleton } from '@/singletons/otp.utils.singleton';
import asyncHandler from '@/utils/asyncHandler.utils';
import JwtUtils from '@/utils/jwt.utils';
import PasswordUtils from '@/utils/password.utils';
import { type Request, type Response, type NextFunction } from 'express';

const { comparePassword } = PasswordUtils;
const { verifyAccessToken } = JwtUtils;

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
  checkAccessToken: asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
      if (!authHeader && !authHeader?.startsWith('Bearer ')) {
        res.status(401).json({
          success: false,
          message: 'Authorization header missing or malformed.',
        });
        return;
      }
      const token = authHeader?.split(' ')[1];
      if (!token) {
        res.status(401).json({
          success: false,
          message: 'Invalid token format.',
        });
        return;
      }
      const decoded = verifyAccessToken(token);
      if (!decoded) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized Request: Invalid or expired token.',
        });
        return;
      }
      const user = await redisClient.get(`user:${decoded?.sub}`);
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized Request: Invalid or expired token.',
        });
        return;
      }
      req.user = JSON.parse(user);
      next();
    }
  ),
  checkRole: (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    const path = req.path;

    if (path.startsWith('/admin')) {
      if (role === 'ADMIN') {
        return next();
      } else {
        return res.status(403).json({
          success: false,
          message:
            'Access Denied: Users are not permitted to access administrative routes.',
        });
      }
    } else {
      if (role === 'USER') {
        return res.status(403).json({
          success: false,
          message:
            'Access Denied: Administrators must use dedicated admin panels.',
        });
      } else {
        return next();
      }
    }
  },
};

export default AuthMiddleware;
