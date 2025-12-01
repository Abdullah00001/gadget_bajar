import { TokenPayload } from '@/types/jwt.types';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  id: string;
  accountStatus: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user: TUser;
      decoded: TokenPayload;
    }
  }
}
