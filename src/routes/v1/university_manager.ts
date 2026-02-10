import { Router } from 'express';
import { managerController  } from '../../controllers/university_manager.controller';
import { validatorCreateManager_un } from '../../middleware/validation/validatormanagers/validatorun_manager';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';

const router = Router();

router.post('/',[checkJwt, connectDatabase, validatorCreateManager_un], managerController.create);
router.get('/', [checkJwt, connectDatabase], managerController.getAll);
router.get('/:id', [checkJwt, connectDatabase], managerController.getById);
router.patch('/:id', [checkJwt, connectDatabase], managerController.update);
router.delete('/:id', [checkJwt, connectDatabase], managerController.delete);

export default router;