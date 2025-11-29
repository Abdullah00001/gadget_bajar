import { TSignupOtpEmail } from '@/types/email.job.types';
import { EmailQueue } from '@/queue/queue';

const EmailQueueJobs = {
  addSendSignupOtpEmailToQueue: async (data: TSignupOtpEmail) => {
    await EmailQueue.add('send-signup-otp-email', data, {
      attempts: 3,
      removeOnComplete: true,
      backoff: { type: 'exponential', delay: 3000 },
    });
  },
};

export default EmailQueueJobs;
