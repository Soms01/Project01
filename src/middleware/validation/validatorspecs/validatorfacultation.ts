import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateFacultation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const errorsValidation: { field: string; message: string }[] = [];

    if (!name || validator.isEmpty(name.trim())) {
      errorsValidation.push({field: "name",message: "Поле 'Назва факультету' є обов’язковим"});
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,"Validation","Помилка валідації факультету",null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
