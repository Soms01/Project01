// src/controllers/application.controller.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { application } from '../orm/entities/Aplication';
import { student } from '../orm/entities/student';
import { practice_place } from '../orm/entities/practice_place';
import { practice_place_manager } from '../orm/entities/practice_place_manager';
import { university_manager } from '../orm/entities/university_manager';

const appRepo = () => getRepository(application);
const studentRepo = () => getRepository(student);
const placeRepo = () => getRepository(practice_place);
const pmRepo = () => getRepository(practice_place_manager);
const umRepo = () => getRepository(university_manager);

// Створити нову заявку
export const createApplication = async (req: Request, res: Response) => {
  try {
    const {
      dateFrom,
      dateTo,
      typePractice,
      report,
      studentId,
      placeId,
      practiceManagerId,
      universityManagerId,
    } = req.body;

    const student = await studentRepo().findOne(studentId);
    const place = await placeRepo().findOne(placeId);
    const pm = await pmRepo().findOne(practiceManagerId);
    const um = await umRepo().findOne(universityManagerId);

    if (!student || !place || !pm || !um) {
      return res.status(404).json({ message: 'Не знайдено одну з сутностей (студент, місце, керівники)' });
    }

    const newApp = appRepo().create({
      dateFrom,
      dateTo,
      type_practice: typePractice,
      report,
      student,
      practice_place: place,
      practice_place_manager: pm,
      university_manager: um,
    });

    const saved = await appRepo().save(newApp);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні заявки', error });
  }
};

// Отримати всі заявки (з пов’язаними даними)
export const getApplications = async (req: Request, res: Response) => {
  const apps = await appRepo().find({
    relations: ['student_id', 'practice_place_id', 'practice_manager_id', 'universit_manager_id'],
  });
  return res.json(apps);
};

// Отримати заявку за ID
export const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const app = await appRepo().findOne(id, {
    relations: ['student_id', 'practice_place_id', 'practice_manager_id', 'universit_manager_id'],
  });
  if (!app) return res.status(404).json({ message: 'Заявку не знайдено' });
  return res.json(app);
};

// Оновити статус заявки (узгоджена / відхилена)
export const updateApplicationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // наприклад: "approved", "rejected", "pending"

  const app = await appRepo().findOne(id);
  if (!app) return res.status(404).json({ message: 'Заявку не знайдено' });

  (app as any).status = status;
  const updated = await appRepo().save(app);
  return res.json(updated);
};
