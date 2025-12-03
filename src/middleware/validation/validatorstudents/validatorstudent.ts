import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullname, specialitionId } =
      req.body;

    const errorsValidation: { field: string; message: string }[] = [];
    if (!fullname || validator.isEmpty(fullname.trim())) {
      errorsValidation.push({ field: "fullname", message: "Поле 'Ім’я' є обов’язковим" });
    }
    if (!specialitionId || !validator.isInt(String(specialitionId), { min: 1 })) {
      errorsValidation.push({ field: "specialitionId", message: 'Некоректний ID спеціалізації' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400, 'Validation', 'Помилка валідації студента', null, null, errorsValidation);
    }
    

    next();
  } catch (err) {
    next(err);
  }
};