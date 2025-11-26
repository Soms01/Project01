import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { university_manager } from '../orm/entities/university_manager';
import { facultation } from '../orm/entities/facultation';

const umRepo = () => getRepository(university_manager);
const facRepo = () => getRepository(facultation);

export const createUniveManager = async (req: Request, res: Response) => {
  try {
    const { fullName, facultationId } = req.body;
    const fac = await facRepo().findOne(facultationId);
    if (!fac) return res.status(404).json({ message: 'Факультет не знайдено' });

    const um = umRepo().create({ fullname: fullName, facultation: fac });
    const saved = await umRepo().save(um);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні керівника практики (КПУ)', error });
  }
};

export const getUniveManagers = async (req: Request, res: Response) => {
  const list = await umRepo().find({ relations: ['facultation'] });
  return res.json(list);
};
