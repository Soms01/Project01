// src/controllers/student.controller.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { student } from '../orm/entities/student';
import { specialition } from '../orm/entities/specialization';

const studentRepo = () => getRepository(student);
const specRepo = () => getRepository(specialition);

// Додати студента
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { fullName, specId } = req.body;

    const spec = await specRepo().findOne(specId);
    if (!spec) return res.status(404).json({ message: 'Спеціальність не знайдена' });

    const student = studentRepo().create({
      fullname: fullName,
      specialition: spec,
    });

    const saved = await studentRepo().save(student);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні студента', error });
  }
};

// Отримати всіх студентів
export const getStudents = async (req: Request, res: Response) => {
  const students = await studentRepo().find({ relations: ['specialition'] });
  return res.json(students);
};
