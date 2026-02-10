import { Router } from 'express';
import { cityController  } from '../../controllers/city.controller';
import { validatorCreateCity } from '../../middleware/validation/validatorplaces/validatorcity';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/', [checkJwt, connectDatabase, validatorCreateCity], cityController.create);
router.put('/:id', [checkJwt, connectDatabase], cityController.update);
router.get('/:id', [checkJwt, connectDatabase], cityController.getById);
router.get('/', [checkJwt, connectDatabase], cityController.getAll);
router.delete('/:id', [checkJwt, connectDatabase], cityController.delete);


export default router;