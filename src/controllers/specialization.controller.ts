import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { specialition } from '../orm/entities/specialization';
import { facultation } from '../orm/entities/facultation';

const specRepo = () => getRepository(specialition);
const facRepo = () => getRepository(facultation);

export const createSpecialition = async (req: Request, res: Response) => {
  try {
    const { name, code, facultationId } = req.body;
    const fac = await facRepo().findOne(facultationId);
    if (!fac) return res.status(404).json({ message: 'Факультет не знайдено' });

    const spec = specRepo().create({ name, code, facultation: fac });
    const saved = await specRepo().save(spec);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні спеціальності', error });
  }
};

export const getSpecialitions = async (req: Request, res: Response) => {
  const specs = await specRepo().find({ relations: ['facultation_id'] });
  return res.json(specs);
};
