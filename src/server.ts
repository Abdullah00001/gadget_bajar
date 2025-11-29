import http from 'http';
import dotenv from 'dotenv';
import app from '@/app';
import { connectDatabase, disconnectDatabase } from '@/configs/database.config';
import { disconnectRedis } from '@/configs/redis.config';

dotenv.config();

const PORT = Number(process.env.PORT) || 5000;

const server = http.createServer(app);

async function main() {
  try {
    await connectDatabase();
    server.listen(PORT, () => {
      console.log('Server Running On Port 5000');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();

async function gracefulShutdown(signal: string) {
  console.log(`\n${signal} signal received.`);
  server.close(async () => {
    console.log('HTTP server closed');
    try {
      await disconnectDatabase();
      await disconnectRedis();
      console.log('All services are disconnected');
      process.exit(0);
    } catch (error) {
      console.error('Error during shutdown:', error);
      process.exit(1);
    }
  });
  setTimeout(() => {
    console.error('Forcefully shutting down');
    process.exit(1);
  }, 10000);
}

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason: unknown) => {
  console.error('Unhandled Rejection:', reason);
  gracefulShutdown('UNHANDLED_REJECTION');
});
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
