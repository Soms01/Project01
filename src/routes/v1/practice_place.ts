import { Router } from 'express';
import { placeController  } from '../../controllers/Practice_place.Controller';
import { validatorCreatePlace } from '../../middleware/validation/validatorplaces/validatorplace';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/',[checkJwt, connectDatabase, validatorCreatePlace] ,placeController.create);
router.get('/', [checkJwt, connectDatabase], placeController.getAll);
router.get('/:id', [checkJwt, connectDatabase], placeController.getById);
router.patch('/:id', [checkJwt, connectDatabase], placeController.update);
router.delete('/:id', [checkJwt, connectDatabase], placeController.delete);


export default router;