import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { facultation } from '../orm/entities/facultation';

const facRepo = () => getRepository(facultation);

export const createFacultation = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const fac = facRepo().create({ name });
    const saved = await facRepo().save(fac);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні факультету', error });
  }
};

export const getFacultations = async (req: Request, res: Response) => {
  const list = await facRepo().find();
  return res.json(list);
};

export const updateFacultation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fac = await facRepo().findOne(id);
  if (!fac) return res.status(404).json({ message: 'Факультет не знайдено' });

  fac.name = req.body.name ?? fac.name;
  const saved = await facRepo().save(fac);
  return res.json(saved);
};

export const deleteFacultation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const fac = await facRepo().findOne(id);
  if (!fac) return res.status(404).json({ message: 'Факультет не знайдено' });
  await facRepo().remove(fac);
  return res.json({ message: 'Факультет видалено' });
};
