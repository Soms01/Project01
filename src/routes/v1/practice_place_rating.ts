import { Router } from 'express';
import { ratingController  } from '../../controllers/practice_place_rating.controller';
import { validatorCreateTask } from '../../middleware/validation/validatorplaces/validatorrating';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/',[checkJwt, connectDatabase, validatorCreateTask] ,ratingController.create);
router.get('/', [checkJwt, connectDatabase], ratingController.getAll);
router.get('/:id', [checkJwt, connectDatabase], ratingController.getById);
router.patch('/:id', [checkJwt, connectDatabase], ratingController.update);
router.delete('/:id', [checkJwt, connectDatabase], ratingController.delete);




export default router;