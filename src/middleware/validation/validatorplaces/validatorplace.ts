import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreatePlace = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, popularity, cityId } = req.body;

    const errorsValidation: { [key: string]: string }[] = [];
    if (!name || validator.isEmpty(String(name).trim())) {
      errorsValidation.push({ name: "Поле 'Назва міста' є обов’язковим" });
    }
    if (description && !validator.isLength(String(description), { max: 100 })) {
      errorsValidation.push({ description: 'Поле "Опис" не повинно перевищувати 100 символів' });
    }
    const popularityStr = popularity !== undefined && popularity !== null ? String(popularity) : '';
    if (validator.isEmpty(popularityStr)) {
      errorsValidation.push({ popularity: "Поле 'Популярність' є обов’язковим" });
    } else if (!validator.isInt(popularityStr, { min: 1 })) {
      errorsValidation.push({ popularity: "Поле 'Популярність' повинно бути числом від 1" });
    }
    if (!cityId || !validator.isInt(String(cityId), { min: 1 })) {
      errorsValidation.push({ field: "cityId", message: 'Некоректний ID міста' });
    }

    if (errorsValidation.length > 0) {
      throw new CustomError(400,'Validation','Помилка валідації міста',null,null,errorsValidation);
    }

    next();
  } catch (err) {
    next(err);
  }
};
