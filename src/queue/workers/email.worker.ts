import logger from '@/configs/logger.configs';
import mailTransporter from '@/configs/nodemailer.configs';
// import mailTransporter from '@/configs/nodemailer.configs';
import redisClient from '@/configs/redis.config';
import signupOtpTemplate from '@/templates/signupOtpTemplate';
import verifySignupUserTemplate from '@/templates/verifySignupUserTemplate';
import { TSignupOtpEmail } from '@/types/email.job.types';
import mailOption from '@/utils/mailOption.utils';
// import mailOption from '@/utils/mailOption.utils';
import { Job, Worker } from 'bullmq';
import Handlebars from 'handlebars';
// import Handlebars from 'handlebars';

const worker = new Worker(
  'email-queue',
  async (job: Job) => {
    const { name, data, id } = job;
    try {
      if (name === 'send-signup-otp-email') {
        const { email, expireAt, otp } = data as TSignupOtpEmail;
        const template = Handlebars.compile(signupOtpTemplate);
        const personalizedTemplate = template({ expireAt, otp });
        await mailTransporter.sendMail(
          mailOption(email, 'Email Verification Required', personalizedTemplate)
        );
        return;
      }
      if (name === 'send-verify-user-account-notification-email') {
        const { email } = data as { email: string };
        const template = Handlebars.compile(verifySignupUserTemplate);
        const personalizedTemplate = template({});
        await mailTransporter.sendMail(
          mailOption(
            email,
            'Account verification successful',
            personalizedTemplate
          )
        );
        return;
      }
    } catch (error) {
      logger.error('Worker job failed', { jobName: name, jobId: id, error });
      throw error;
    }
  },
  { connection: redisClient }
);

worker.on('completed', (job: Job) => {
  logger.info(`Job Name : ${job.name} Job Id : ${job.id} Completed`);
});

worker.on('failed', (job: Job | undefined, error: Error) => {
  if (!job) {
    logger.error(
      `A job failed but the job data is undefined.\nError:\n${error}`
    );
    return;
  }
  logger.error(
    `Job Name : ${job.name} Job Id : ${job.id} Failed\nError:\n${error}`
  );
});
