import { Router } from 'express';
import { cityController  } from '../../controllers/city.controller';
import { validatorCreateCity } from '../../middleware/validation/validatorplaces/validatorcity';

const router = Router();

router.post('/', [validatorCreateCity], cityController.create);
router.put('/:id', cityController.update);
router.get('/:id', cityController.getById);
router.get('/', cityController.getAll);
router.delete('/:id', cityController.delete);


export default router;