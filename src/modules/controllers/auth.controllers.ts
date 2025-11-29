import asyncHandler from '@/utils/asyncHandler.utils';
import { type Request, type Response, type NextFunction } from 'express';
import AuthServices from '../services/auth.services';

const { processSignup, processVerifyUser } = AuthServices;

const AuthControllers = {
  handleSignup: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { name, email, password } = req.body;
      const data = await processSignup({ name, email, password });
      res.status(201).json({
        success: true,
        message:
          'Signup successful,Please check your email we send you a verification code for verify your account',
        user: {
          name,
          email,
          id: data.id,
          role: data.role,
          accountStatus: data.accountStatus,
        },
      });
      return;
    }
  ),
  handleVerifyUser: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { email } = req.body;
      await processVerifyUser({ email });
      res.status(200).json({
        success: true,
        message: 'Account verification successful',
      });
      return;
    }
  ),
};

export default AuthControllers;
