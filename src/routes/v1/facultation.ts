import { Router } from 'express';
import { facultationController  } from '../../controllers/facultation.controller';
import { validatorCreateFacultation } from '../../middleware/validation/validatorspecs/validatorfacultation';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/', [checkJwt, connectDatabase, validatorCreateFacultation], facultationController.create);
router.get('/', [checkJwt, connectDatabase], facultationController.getAll);
router.get('/:id', [checkJwt, connectDatabase], facultationController.getById);
router.put('/:id', [checkJwt, connectDatabase], facultationController.update);
router.delete('/:id', [checkJwt, connectDatabase], facultationController.delete);

export default router;