import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { task } from '../orm/entities/task';
import { application } from '../orm/entities/application';

const taskRepo = () => getRepository(task);
const appRepo = () => getRepository(application);

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, rating, applicationId } = req.body;
    const app = await appRepo().findOne(applicationId);
    if (!app) return res.status(404).json({ message: 'Заявку не знайдено' });

    const task = taskRepo().create({ name, rating, application: app });
    const saved = await taskRepo().save(task);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: 'Помилка при створенні задачі', error });
  }
};

export const getTasksByApplication = async (req: Request, res: Response) => {
  const { appId } = req.params;
  const tasks = await taskRepo().find({
    where: { application_id: Number(appId) },
    relations: ['application_id'],
  });
  return res.json(tasks);
};
