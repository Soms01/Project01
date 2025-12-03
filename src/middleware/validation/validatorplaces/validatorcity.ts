import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];

    const nameStr = name !== undefined && name !== null ? String(name).trim() : '';
    if (validator.isEmpty(nameStr)) {
      errorsValidation.push({ name: "Поле 'Назва міста' є обов’язковим" });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,'Validation','Помилка валідації міста',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
