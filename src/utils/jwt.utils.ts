import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenPayload } from '@/types/jwt.types';
import { env } from '@/env';
import { accessTokenExpiresIn } from '@/const';

const JwtUtils = {
  generateAccessToken: (payload: TokenPayload | null): string => {
    if (!payload) {
      throw new Error('Generate AccessToken Payload Cant Be Null');
    }
    return jwt.sign(payload, env.JWT_ACCESS_TOKEN_SECRET_KEY as string, {
      expiresIn: accessTokenExpiresIn,
    });
  },
  verifyAccessToken: (token: string | null): JwtPayload => {
    if (!token) {
      throw new Error('Access Token Is Missing');
    }
    return jwt.verify(token, env.JWT_ACCESS_TOKEN_SECRET_KEY) as JwtPayload;
  },
};

export default JwtUtils;
