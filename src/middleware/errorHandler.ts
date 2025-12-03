import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error caught by middleware:', err);

  if (err instanceof CustomError) {
    return res.status(err.httpStatusCode).json({
      success: false,
      errorType: err.errorType,
      message: err.message,
      errors: err.errorsValidation || err.errors || null,
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    errorMessage: err.message,
  });
};