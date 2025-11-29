import { Router } from 'express';
import AuthControllers from '@/modules/controllers/auth.controllers';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import {
  signupSchema,
  verifySignupUserSchema,
} from '@/modules/schemas/auth.schema';

const router = Router();

const { handleSignup, handleVerifyUser } = AuthControllers;
const { isSignupUserExist, isUserExist, checkSignupOtp } = AuthMiddleware;

router
  .route('/auth/signup')
  .post(validateRequest(signupSchema), isSignupUserExist, handleSignup);

router
  .route('/auth/verify')
  .post(
    validateRequest(verifySignupUserSchema),
    isUserExist,
    checkSignupOtp,
    handleVerifyUser
  );

export default router;
