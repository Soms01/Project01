import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { practice_place_manager } from '../orm/entities/practice_place_manager';
import { practice_place } from '../orm/entities/practice_place';

const pmRepo = () => getRepository(practice_place_manager);
const placeRepo = () => getRepository(practice_place);

export const createPractiManager = async (req: Request, res: Response) => {
  try {
    const { fullName, placeId } = req.body;
    const place = await placeRepo().findOne(placeId);
    if (!place) return res.status(404).json({ message: 'Місце практики не знайдено' });

    const pm = pmRepo().create({ fullname: fullName, practice_place: place });
    const saved = await pmRepo().save(pm);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні керівника практики (КПМП)', error });
  }
};

export const getPractiManagers = async (req: Request, res: Response) => {
  const list = await pmRepo().find({ relations: ['practice_place_id'] });
  return res.json(list);
};
