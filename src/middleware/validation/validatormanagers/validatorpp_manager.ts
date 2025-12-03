import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateManager_pp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, practicePlaceId } =
      req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    const fullnameStr =
    fullname !== undefined && fullname !== null ? String(fullname).trim() : '';
    if (validator.isEmpty(fullnameStr)) {
      errorsValidation.push({fullname: "Поле 'ПІБ керівника' є обов’язковим",});
    }
    if (!practicePlaceId || !validator.isInt(String(practicePlaceId), { min: 1 })) {
      errorsValidation.push({ field: "practicePlaceId", message: 'Некоректний ID місця практики' });
    }

    if (errorsValidation.length > 0) {
    throw new CustomError(400,'Validation','Помилка валідації керівника університету',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};