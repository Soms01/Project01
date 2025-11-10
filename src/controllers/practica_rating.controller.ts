import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { practice_place_rating } from '../orm/entities/practice_place_rating';
import { student } from '../orm/entities/student';
import { practice_place } from '../orm/entities/practice_place';

const ratingRepo = () => getRepository(practice_place_rating);
const studentRepo = () => getRepository(student);
const placeRepo = () => getRepository(practice_place);

export const createRating = async (req: Request, res: Response) => {
  try {
    const { rating, studentId, placeId } = req.body;

    const student = await studentRepo().findOne(studentId);
    const place = await placeRepo().findOne(placeId);

    if (!student || !place)
      return res.status(404).json({ message: 'Студента або місце практики не знайдено' });

    const newRating = ratingRepo().create({
      rating,
      student: student,
      practice_place: place,
    });

    const saved = await ratingRepo().save(newRating);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні оцінки місця практики', error });
  }
};

export const getRatings = async (req: Request, res: Response) => {
  const ratings = await ratingRepo().find({ relations: ['student_id', 'practice_place_id'] });
  return res.json(ratings);
};
