import { Request, Response, NextFunction } from 'express';
import { dbCreateConnection } from "orm/dbCreateConnection";

export const connectDatabase = async (req: Request, res: Response, next: NextFunction) => {
  await dbCreateConnection(
    req.jwtPayload?.username || process.env.POSTGRES_USER,
    req.jwtPayload?.password || process.env.POSTGRES_PASSWORD
  );
  console.log('📦 Database connection established');
  return next();
};
