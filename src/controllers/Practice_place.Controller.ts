// src/controllers/practicePlace.controller.ts
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { practice_place } from '../orm/entities/practice_place';
import { city } from '../orm/entities/city';

const placeRepo = () => getRepository(practice_place);
const cityRepo = () => getRepository(city);

// Додати місце практики
export const createPracticePlace = async (req: Request, res: Response) => {
  try {
    const { name, description, popularity, cityId } = req.body;

    const city = await cityRepo().findOne(cityId);
    if (!city) {
      return res.status(404).json({ message: 'Місто не знайдено' });
    }

    const newPlace = placeRepo().create({
      name,
      description,
      popularity,
      cityId,
    });

    const saved = await placeRepo().save(newPlace);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні місця практики', error });
  }
};

// Отримати всі місця практики з містом
export const getPracticePlaces = async (req: Request, res: Response) => {
  const places = await placeRepo().find({ relations: ['city'] });
  return res.json(places);
};

// Отримати місце за ID
export const getPracticePlaceById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const place = await placeRepo().findOne(id, { relations: ['city'] });
  if (!place) return res.status(404).json({ message: 'Місце не знайдено' });
  return res.json(place);
};

// Оновити місце
export const updatePracticePlace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, popularity } = req.body;

  const place = await placeRepo().findOne(id);
  if (!place) return res.status(404).json({ message: 'Місце не знайдено' });

  place.name = name ?? place.name;
  place.description = description ?? place.description;
  place.popularity = popularity ?? place.popularity;

  const updated = await placeRepo().save(place);
  return res.json(updated);
};

// Видалити місце
export const deletePracticePlace = async (req: Request, res: Response) => {
  const { id } = req.params;
  const place = await placeRepo().findOne(id);
  if (!place) return res.status(404).json({ message: 'Місце не знайдено' });

  await placeRepo().remove(place);
  return res.json({ message: 'Місце успішно видалено' });
};
