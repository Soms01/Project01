import { Router } from 'express';
import { createStudent, getStudents  } from '../../controllers/student.controller';

const router = Router();

router.post('/', createStudent);
router.get('/', getStudents);

export default router;