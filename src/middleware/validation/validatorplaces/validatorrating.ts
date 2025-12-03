import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { rating, practicePlaceId, studentId } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    const ratingStr = rating !== undefined && rating !== null ? String(rating) : '';
    if (validator.isEmpty(ratingStr)) {
      errorsValidation.push({ rating: "Поле 'Оцінка' є обов’язковим" });
    } else if (!validator.isInt(ratingStr, { min: 1 })) {
      errorsValidation.push({ rating: "Оцінка має бути цілим числом від 1" });
    }
    if (!practicePlaceId || !validator.isInt(String(practicePlaceId), { min: 1 })) {
      errorsValidation.push({ field: "practicePlaceId", message: 'Некоректний ID місця практики' });
    }
    if (!studentId || !validator.isInt(String(studentId), { min: 1 })) {
      errorsValidation.push({ field: "studentId", message: 'Некоректний ID студента' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,'Validation','Помилка валідації завдання',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
