import { Router } from 'express';
import AuthControllers from '@/modules/controllers/auth.controllers';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import { loginSchema, signupSchema } from '@/modules/schemas/auth.schema';

const router = Router();

const { handleSignup, handleLogin } = AuthControllers;
const { isSignupUserExist, isUserExist, checkPassword } = AuthMiddleware;

// Signup Endpoint
router
  .route('/auth/signup')
  .post(validateRequest(signupSchema), isSignupUserExist, handleSignup);

// Login Endpoint
router
  .route('/auth/login')
  .post(validateRequest(loginSchema), isUserExist, checkPassword, handleLogin);

export default router;
