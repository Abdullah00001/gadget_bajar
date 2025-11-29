import { type NextFunction, type Request, type Response } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;
type ExpressHandler = (req: Request, res: Response, next: NextFunction) => void;

const asyncHandler = (requestHandler: AsyncRequestHandler): ExpressHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error: Error) => {
      next(error);
    });
  };
};

export default asyncHandler;
