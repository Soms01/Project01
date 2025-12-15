import { Router } from 'express';
import { managerController  } from '../../controllers/university_manager.controller';
import { validatorCreateManager_un } from '../../middleware/validation/validatormanagers/validatorun_manager';


const router = Router();

router.post('/',[validatorCreateManager_un], managerController.create);
router.get('/', managerController.getAll);
router.get('/:id', managerController.getById);
router.patch('/:id', managerController.update);
router.delete('/:id', managerController.delete);

export default router;