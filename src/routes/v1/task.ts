import { Router } from 'express';
import { taskController } from '../../controllers/tasks.controller';
import { validatorCreateTask } from '../../middleware/validation/validatormanagers/validatortask';

const router = Router();

router.post('/',[validatorCreateTask], taskController.create);
router.get('/', taskController.getAll);
router.get('/:id', taskController.getById);
router.patch('/:id', taskController.update);
router.delete('/:id', taskController.delete);




export default router;