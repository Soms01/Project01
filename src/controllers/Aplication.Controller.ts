
import { Request, Response, NextFunction } from 'express';
import { applicationservices } from '../services/applicationservices';

const applicationService = new applicationservices

export class applicationController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await applicationService.getAllApplications();
       res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await applicationService.getApplicationById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await applicationService.createApplication(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }

  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await applicationService.updateApplication(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
   static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await applicationService.deleteApplication(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};