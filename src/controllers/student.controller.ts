
import { Request, Response, NextFunction } from 'express';
import { studentservices } from '../services/studentservices';

const studentService = new studentservices

export class applicationController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await studentService.getAllStudents();
       res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await studentService.getStudentById(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await studentService.createStudent(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }

  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await studentService.updateStudent(id, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
   static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await studentService.deleteStudent(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};
