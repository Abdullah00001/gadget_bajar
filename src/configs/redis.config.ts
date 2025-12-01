import { env } from '@/env';
import { Redis } from 'ioredis';

const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: false,
  tls:{
    rejectUnauthorized: false
  }
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

redisClient.on('close', () => {
  console.log('Redis connection closed');
});

export async function disconnectRedis() {
  try {
    await redisClient.quit();
    console.log('Redis disconnected');
  } catch (error) {
    console.error('Error disconnecting Redis:', error);
    throw error;
  }
}

export default redisClient;
