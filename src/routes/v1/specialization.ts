import { Router } from 'express';
import { specialitionController  } from '../../controllers/specialization.controller';
import { validatorCreateSpecialition } from '../../middleware/validation/validatorspecs/validatorspecialition';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/',[checkJwt, connectDatabase, validatorCreateSpecialition] ,specialitionController.create);
router.get('/', [checkJwt, connectDatabase], specialitionController.getAll);
router.get('/:id', [checkJwt, connectDatabase], specialitionController.getById);
router.patch('/:id', [checkJwt, connectDatabase], specialitionController.update);
router.delete('/:id', [checkJwt, connectDatabase], specialitionController.delete);


export default router;