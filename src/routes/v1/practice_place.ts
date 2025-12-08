import { Router } from 'express';
import { placeController  } from '../../controllers/Practice_place.Controller';
import { validatorCreatePlace } from '../../middleware/validation/validatorplaces/validatorplace';

const router = Router();

router.post('/',[validatorCreatePlace] ,placeController.create);
router.get('/', placeController.getAll);
router.get('/:id', placeController.getById);
router.put('/:id', placeController.update);
router.delete('/:id', placeController.delete);


export default router;