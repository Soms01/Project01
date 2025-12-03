
import { Request, Response, NextFunction } from 'express';
import { un_managerservices } from '../services/un_managerservices';

const managerService = new un_managerservices

export class applicationController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await managerService.getAllUniversity_managers();
       res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await managerService.getUniversity_managerById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await managerService.createUniversity_manager(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }

  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await managerService.updateUniversity_manager(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
   static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await managerService.deleteUniversity_manager(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};

