import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CustomError } from '../../../utils/response/custom-error/CustomError';

export const validatorCreateApplication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dateFrom, dateTo, report, type_practice, studentId, practicePlaceManagerId, practicePlaceId, universityManagerId } =
      req.body;

    const errors: { field: string; message: string }[] = [];
    if (!dateFrom || validator.isEmpty(String(dateFrom).trim())) {
      errors.push({ field: "dateFrom", message: "Поле 'Дата заселення' є обов’язковим" });
    } else if (!validator.isDate(String(dateFrom), { format: "YYYY-MM-DD", strictMode: true })) {
      errors.push({ field: "dateFrom", message: "Невірний формат дати заселення (очікується YYYY-MM-DD)" });
    }
    if (dateTo && !validator.isEmpty(String(dateTo).trim())) {
      if (!validator.isDate(String(dateTo), { format: "YYYY-MM-DD", strictMode: true })) {
        errors.push({ field: "dateTo", message: "Невірний формат дати виселення (очікується YYYY-MM-DD)" });
      } else if (new Date(dateTo) < new Date(dateFrom)) {
        errors.push({ field: "dateTo", message: "Дата виселення не може бути раніше дати заселення" });
      }
    }
    if (type_practice && !validator.isLength(type_practice, { max: 100 })) {
      errors.push({ field: "type_practice", message: "Поле 'Тип практики' не повинно перевищувати 100 символів" });
    }
    if (report && !validator.isLength(report, { max: 100 })) {
      errors.push({ field: "report", message: "Поле 'Звіт' не повинно перевищувати 100 символів" });
    }
    if (!studentId || !validator.isInt(String(studentId), { min: 1 })) {
      errors.push({ field: "studentId", message: 'Некоректний ID студента' });
    }
    if (!practicePlaceManagerId || !validator.isInt(String(practicePlaceManagerId), { min: 1 })) {
      errors.push({ field: "practicePlaceManagerId", message: 'Некоректний ID менеджера практики' });
    }
    if (!practicePlaceId || !validator.isInt(String(practicePlaceId), { min: 1 })) {
      errors.push({ field: "practicePlaceId", message: 'Некоректний ID місця практики' });
    }
    if (!universityManagerId || !validator.isInt(String(universityManagerId), { min: 1 })) {
      errors.push({ field: "universityManagerId", message: 'Некоректний ID менеждера університета' });
    }



    if (errors.length > 0) {
      throw new CustomError(400,"Validation","Помилка валідації заявки",null,null,errors);
    }

    next();
  } catch (err) {
    next(err);
  }
};