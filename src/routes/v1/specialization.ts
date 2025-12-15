import { Router } from 'express';
import { specialitionController  } from '../../controllers/specialization.controller';
import { validatorCreateSpecialition } from '../../middleware/validation/validatorspecs/validatorspecialition';

const router = Router();

router.post('/',[validatorCreateSpecialition] ,specialitionController.create);
router.get('/', specialitionController.getAll);
router.get('/:id', specialitionController.getById);
router.patch('/:id', specialitionController.update);
router.delete('/:id', specialitionController.delete);


export default router;