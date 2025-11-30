import { Router } from 'express';
import AuthControllers from '@/modules/controllers/auth.controllers';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import {
  loginSchema,
  signupSchema,
  verifySignupUserSchema,
} from '@/modules/schemas/auth.schema';

const router = Router();

const { handleSignup, handleVerifyUser, handleLogin } = AuthControllers;
const { isSignupUserExist, isUserExist, checkSignupOtp, checkPassword } =
  AuthMiddleware;

// Signup Endpoint
router
  .route('/auth/signup')
  .post(validateRequest(signupSchema), isSignupUserExist, handleSignup);

// Verify Signup User Endpoint
router
  .route('/auth/verify')
  .post(
    validateRequest(verifySignupUserSchema),
    isUserExist,
    checkSignupOtp,
    handleVerifyUser
  );

// Login Endpoint
router
  .route('/auth/login')
  .post(validateRequest(loginSchema), isUserExist, checkPassword, handleLogin);

export default router;
