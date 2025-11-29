import { getEnvVariable } from '@/utils/getEnvVariables.utils';
import IEnvConfig from '@/types/env.types';

export const env: IEnvConfig = {
  NODE_ENV: getEnvVariable('NODE_ENV'),
  DATABASE_URL: getEnvVariable('DATABASE_URL'),
  REDIS_URL: getEnvVariable('REDIS_URL'),
  SMTP_HOST: getEnvVariable('SMTP_HOST'),
  SMTP_PORT: parseInt(getEnvVariable('SMTP_PORT')),
  SMTP_USER: getEnvVariable('SMTP_USER'),
  SMTP_PASS: getEnvVariable('SMTP_PASS'),
};
