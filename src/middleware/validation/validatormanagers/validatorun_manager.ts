import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateManager_un = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, specialitionId } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    const fullnameStr =
      fullname !== undefined && fullname !== null ? String(fullname).trim() : '';
    if (validator.isEmpty(fullnameStr)) {
      errorsValidation.push({fullname: "Поле 'ПІБ керівника' є обов’язковим",});
    }
    if (!specialitionId || !validator.isInt(String(specialitionId), { min: 1 })) {
      errorsValidation.push({ field: "specialitionId", message: 'Некоректний ID спеціалізації' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,'Validation','Помилка валідації керівника університету',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
