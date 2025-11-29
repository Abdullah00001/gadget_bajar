import logger from '@/configs/logger.configs';
import mailTransporter from '@/configs/nodemailer.configs';
import redisClient from '@/configs/redis.config';
import mailOption from '@/utils/mailOption.utils';
import { Job, Worker } from 'bullmq';
import Handlebars from 'handlebars';

const worker = new Worker(
  'email-queue',
  async (job: Job) => {
    const { name, data, id } = job;
    try {
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
