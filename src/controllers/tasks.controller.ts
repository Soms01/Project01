
import { Request, Response, NextFunction } from 'express';
import { taskservices } from '../services/taskservices';

const taskService = new taskservices

export class applicationController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await taskService.getAllTasks();
       res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await taskService.getTaskById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await taskService.createTask(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }

  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await taskService.updateTask(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
   static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await taskService.deleteTask(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};

