import { Router } from 'express';
import { studentController  } from '../../controllers/student.controller';
import { validatorCreateStudent } from '../../middleware/validation/validatorstudents/validatorstudent';


const router = Router();

router.post('/',[validatorCreateStudent], studentController.create);
router.get('/', studentController.getAll);
router.get('/:id', studentController.getById);
router.patch('/:id', studentController.update);
router.delete('/:id', studentController.delete);

export default router;