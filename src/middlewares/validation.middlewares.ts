import { type Request, type Response, type NextFunction } from 'express';
import { ZodError, type ZodType } from 'zod';

/**
 * Middleware factory for validating request body with Zod schema
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate the request body against the schema
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));

        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
        return;
      }
      // Handle unexpected errors
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
      return;
    }
  };
};

export default validateRequest;
