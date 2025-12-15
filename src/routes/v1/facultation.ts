import { Router } from 'express';
import { facultationController  } from '../../controllers/facultation.controller';
import { validatorCreateFacultation } from '../../middleware/validation/validatorspecs/validatorfacultation';

const router = Router();

router.post('/', [validatorCreateFacultation], facultationController.create);
router.get('/', facultationController.getAll);
router.get('/:id', facultationController.getById);
router.put('/:id', facultationController.update);
router.delete('/:id', facultationController.delete);

export default router;