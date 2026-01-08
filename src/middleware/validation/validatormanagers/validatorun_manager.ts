import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateManager_un = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, facultationId } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    const fullnameStr =
      fullname !== undefined && fullname !== null ? String(fullname).trim() : '';
    if (validator.isEmpty(fullnameStr)) {
      errorsValidation.push({fullname: "Поле 'ПІБ керівника' є обов’язковим",});
    }
    if (!facultationId || !validator.isInt(String(facultationId), { min: 1 })) {
      errorsValidation.push({ field: "facultationId", message: 'Некоректний ID факультету' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,'Validation','Помилка валідації керівника університету',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
