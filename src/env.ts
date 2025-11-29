import { getEnvVariable } from '@/utils/getEnvVariables.utils';
import IEnvConfig from '@/types/env.types';

export const env: IEnvConfig = {
  NODE_ENV: getEnvVariable('NODE_ENV'),
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  REDIS_URL: getEnvVariable('REDIS_URL'),
};