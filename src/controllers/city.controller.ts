import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { city } from '../orm/entities/city';

const cityRepo = () => getRepository(city);

export const createCity = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newcity = cityRepo().create({ name });
    const saved = await cityRepo().save(newcity);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні міста', error });
  }
};

export const getCities = async (req: Request, res: Response) => {
  const cities = await cityRepo().find();
  return res.json(cities);
};

export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingcity = await cityRepo().findOne(id);
  if (!existingcity) return res.status(404).json({ message: 'Місто не знайдено' });

  existingcity.name = req.body.name ?? existingcity.name;

  const saved = await cityRepo().save(existingcity);
  return res.json(saved);
};

export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingcity = await cityRepo().findOne(id);
  if (!existingcity){return res.status(404).json({ message: 'Місто не знайдено' });
}
  await cityRepo().remove(existingcity);
  return res.json({ message: 'Місто видалено' });
};
