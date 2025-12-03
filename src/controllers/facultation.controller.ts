
import { Request, Response, NextFunction } from 'express';
import { facultationservices } from '../services/facultationservices';

const facService = new facultationservices

export class applicationController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await facService.getAllFacultations();
       res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await facService.getFacultationById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await facService.createFacultation(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }

  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await facService.updateFacultation(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
   static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await facService.deleteFacultation(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};