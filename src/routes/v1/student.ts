import { Router } from 'express';
import { studentController  } from '../../controllers/student.controller';
import { validatorCreateStudent } from '../../middleware/validation/validatorstudents/validatorstudent';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/',[checkJwt, connectDatabase, validatorCreateStudent], studentController.create);
router.get('/', [checkJwt, connectDatabase], studentController.getAll);
router.get('/:id', [checkJwt, connectDatabase], studentController.getById);
router.patch('/:id', [checkJwt, connectDatabase], studentController.update);
router.delete('/:id', [checkJwt, connectDatabase], studentController.delete);

export default router;