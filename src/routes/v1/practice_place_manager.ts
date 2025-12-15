import { Router } from 'express';
import {  managerController } from '../../controllers/practice_place_manager.controller';
import { validatorCreateManager_pp } from '../../middleware/validation/validatormanagers/validatorpp_manager';

const router = Router();

router.get('/', managerController.getAll);
router.post('/',[validatorCreateManager_pp], managerController.create);
router.patch('/:id', managerController.update);
router.get('/:id', managerController.getById);
router.delete('/:id', managerController.delete);


export default router;