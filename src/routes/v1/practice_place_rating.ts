import { Router } from 'express';
import { ratingController  } from '../../controllers/practice_place_rating.controller';
import { validatorCreateTask } from '../../middleware/validation/validatorplaces/validatorrating';


const router = Router();

router.post('/',[validatorCreateTask] ,ratingController.create);
router.get('/', ratingController.getAll);
router.get('/:id', ratingController.getById);
router.put('/:id', ratingController.update);
router.delete('/:id', ratingController.delete);




export default router;