import prisma from '@/configs/database.config';
import { TSignupPayload } from '@/modules/schemas/auth.schema';
import PasswordUtils from '@/utils/password.utils';
import CalculationUtils from '@/utils/calculation.utils';
import redisClient from '@/configs/redis.config';
import { accessTokenExpiresIn } from '@/const';
import { TUser } from '@/types/express';
import JwtUtils from '@/utils/jwt.utils';

const { hashPassword } = PasswordUtils;
const { expiresInTimeUnitToMs } = CalculationUtils;
const { generateAccessToken } = JwtUtils;

const AuthServices = {
  processSignup: async ({ email, name, password }: TSignupPayload) => {
    try {
      const hashPass = await hashPassword(password);
      if (!hashPass) throw new Error('Password hashing failed');
      const newUser = await prisma.user.create({
        data: { name, email, password: hashPass },
      });
      return newUser;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in signup service');
    }
  },
  processLogin: async (user: TUser) => {
    try {
      const accessToken = generateAccessToken({
        role: user.role,
        sub: user.id,
      });
      await redisClient.set(
        `user:${user.id}`,
        JSON.stringify(user),
        'PX',
        expiresInTimeUnitToMs(accessTokenExpiresIn)
      );
      return accessToken;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in login service');
    }
  },
};

export default AuthServices;
