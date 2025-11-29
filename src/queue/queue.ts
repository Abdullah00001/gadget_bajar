import redisClient from '@/configs/redis.config';
import { Queue } from 'bullmq';

export const EmailQueue = new Queue('email-queue', { connection: redisClient });
