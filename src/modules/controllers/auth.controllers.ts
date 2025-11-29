import asyncHandler from '@/utils/asyncHandler.utils';
import { type Request, type Response, type NextFunction } from 'express';
import AuthServices from '../services/auth.services';

const { processSignup } = AuthServices;

const AuthControllers = {
  handleSignup: asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { name, email, password } = req.body;
      const data = await processSignup({ name, email, password });
      res.status(201).json({
        success: true,
        message:
          'Signup successful,Please check your email we send you a verification code for verify your account',
        user: { name, email, id: data.id, role: data.role },
      });
      return;
    }
  ),
};

export default AuthControllers;
