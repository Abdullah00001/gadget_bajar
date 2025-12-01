export default interface IEnvConfig {
  NODE_ENV: string;
  DATABASE_URL: string;
  REDIS_URL: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
  JWT_ACCESS_TOKEN_SECRET_KEY: string;
  OTP_HASH_SECRET: string;
  GROQ_API_KEY: string;
}
