import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, rating, applicationId } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    const nameStr = name !== undefined && name !== null ? String(name).trim() : '';
    if (validator.isEmpty(nameStr)) {
      errorsValidation.push({ name: "Поле 'Назва завдання' є обов’язковим" });
    }
    const ratingStr =
      rating !== undefined && rating !== null ? String(rating).trim() : '';
    if (!validator.isInt(ratingStr, { min: 1 })) {
      errorsValidation.push({ rating: 'Рейтинг має бути цілим числом від 1 і більше' });
    }
    if (!applicationId || !validator.isInt(String(applicationId), { min: 1 })) {
      errorsValidation.push({ field: "applicationId", message: 'Некоректний ID заявки' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,'Validation','Помилка валідації завдання',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
