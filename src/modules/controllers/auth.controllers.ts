import asyncHandler from '@/utils/asyncHandler.utils';
import { type Request, type Response, type NextFunction } from 'express';
import AuthServices from '../services/auth.services';

const { processSignup, processLogin } = AuthServices;

const AuthControllers = {
  handleSignup: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { name, email, password } = req.body;
      const data = await processSignup({ name, email, password });
      res.status(201).json({
        success: true,
        message:
          'Signup successful,You can login now.',
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
  handleLogin: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user;
      const accessToken = await processLogin(user);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        accessToken,
      });
      return;
    }
  ),
};

export default AuthControllers;
