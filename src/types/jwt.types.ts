import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  sub: string;
  role: 'admin' | 'user';
}

export interface IRefreshTokenPayload extends TokenPayload {
  refreshToken: string;
}
