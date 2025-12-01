import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  sub: string;
  role: string;
}
