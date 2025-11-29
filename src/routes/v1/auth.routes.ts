import { Router } from 'express';
import AuthControllers from '@/modules/controllers/auth.controllers';
import AuthMiddleware from '@/modules/middlewares/auth.middlewares';
import validateRequest from '@/middlewares/validation.middlewares';
import { signupSchema } from '@/modules/schemas/auth.schema';

const router = Router();

const { handleSignup } = AuthControllers;
const { isSignupUserExist } = AuthMiddleware;

router
  .route('/auth/signup')
  .post(validateRequest(signupSchema), isSignupUserExist, handleSignup);

export default router;
