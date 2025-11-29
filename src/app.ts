import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { morganMessageFormat, streamConfig } from '@/configs/morgan.configs';
import corsConfiguration from '@/configs/cors.configs';
import { globalErrorMiddleware } from '@/middlewares/globalError.middleware';
import { baseUrl } from '@/const';
import v1Routes from '@/routes/v1';
import '@/queue/index';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsConfiguration));
app.use(
  morgan(morganMessageFormat, {
    stream: {
      write: (message: string) => streamConfig(message),
    },
  })
);

/* ====================================|
|--------------APP ROUTES--------------|
|==================================== */

// V1 ROUTES
app.use(baseUrl.v1, v1Routes);
// Health Route
app.get('/health', (_req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json({ message: 'Server Is Running' });
  }, 6000);
});
// Route Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: `Cannot ${req.method} ${req.originalUrl}`,
  });
});
// Global Error Middleware
app.use(globalErrorMiddleware);

export default app;
