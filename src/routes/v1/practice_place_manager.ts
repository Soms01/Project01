import { Router } from 'express';
import {  managerController } from '../../controllers/practice_place_manager.controller';
import { validatorCreateManager_pp } from '../../middleware/validation/validatormanagers/validatorpp_manager';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.get('/', [checkJwt, connectDatabase], managerController.getAll);
router.post('/',[checkJwt, connectDatabase, validatorCreateManager_pp], managerController.create);
router.patch('/:id', [checkJwt, connectDatabase], managerController.update);
router.get('/:id', [checkJwt, connectDatabase], managerController.getById);
router.delete('/:id', [checkJwt, connectDatabase], managerController.delete);


export default router;