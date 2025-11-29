import prisma from '@/configs/database.config';
import { generate } from 'otp-generator';
import { TSignupPayload } from '@/modules/schemas/auth.schema';
import PasswordUtils from '@/utils/password.utils';
import { OtpUtilsSingleton } from '@/singletons/otp.utils.singleton';
import CalculationUtils from '@/utils/calculation.utils';
import redisClient from '@/configs/redis.config';
import { otpExpireAt } from '@/const';
import EmailQueueJobs from '@/queue/jobs/email.jobs';

const { hashPassword } = PasswordUtils;
const { calculateMilliseconds } = CalculationUtils;
const { addSendSignupOtpEmailToQueue } = EmailQueueJobs;

const AuthServices = {
  processSignup: async ({ email, name, password }: TSignupPayload) => {
    try {
      const hashPass = await hashPassword(password);
      if (!hashPass) throw new Error('Password hashing failed');
      const newUser = await prisma.user.create({
        data: { name, email, password: hashPass },
      });
      const otpString = generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      const hashOtp = OtpUtilsSingleton().hashOtp({ otp: otpString });
      await Promise.all([
        redisClient.set(
          `user:otp:${email}`,
          hashOtp,
          'PX',
          calculateMilliseconds(otpExpireAt, 'minute')
        ),
        addSendSignupOtpEmailToQueue({
          email,
          expireAt: String(otpExpireAt),
          otp: otpString,
        }),
      ]);
      return newUser;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error('Unknown error occurred in signup service');
    }
  },
};

export default AuthServices;
