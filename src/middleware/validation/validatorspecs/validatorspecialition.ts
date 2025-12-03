import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateSpecialition = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, code, facultationId } = req.body;

    const errorsValidation: { field: string; message: string }[] = [];
    if (!name || validator.isEmpty(name.trim())) {
      errorsValidation.push({field: "name",message: "Поле 'Назва спеціальності' є обов’язковим"});
    }
    if (!code || validator.isEmpty(code.trim())) {
      errorsValidation.push({field: "code",message: "Поле 'Код спеціальності' є обов’язковим"});
    }
    if (!facultationId || !validator.isInt(String(facultationId), { min: 1 })) {
      errorsValidation.push({ field: "facultationId", message: 'Некоректний ID факультета' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,"Validation","Помилка валідації спеціальності",null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
