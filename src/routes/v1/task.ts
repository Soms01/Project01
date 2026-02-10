import { Router } from 'express';
import { taskController } from '../../controllers/tasks.controller';
import { validatorCreateTask } from '../../middleware/validation/validatormanagers/validatortask';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/',[checkJwt, connectDatabase, validatorCreateTask], taskController.create);
router.get('/', [checkJwt, connectDatabase], taskController.getAll);
router.get('/:id', [checkJwt, connectDatabase], taskController.getById);
router.patch('/:id', [checkJwt, connectDatabase], taskController.update);
router.delete('/:id', [checkJwt, connectDatabase], taskController.delete);




export default router;