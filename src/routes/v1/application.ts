// src/routes/v1/tourOrder.routes.ts
import { Router } from 'express';
import { applicationController  } from '../../controllers/Aplication.Controller';
import { validatorCreateApplication } from '../../middleware/validation/validatorstudents/validatorapplication';
import { connectDatabase } from 'middleware/connectDatabase';
import { checkJwt } from 'middleware/checkJwt';


const router = Router();

router.post('/', [checkJwt, connectDatabase, validatorCreateApplication], applicationController.create);
router.get('/', [connectDatabase], applicationController.getAll);
router.get('/:id', [connectDatabase], applicationController.getById);
router.patch('/:id', [checkJwt, connectDatabase], applicationController.update);
router.delete('/:id', [checkJwt, connectDatabase], applicationController.delete);


export default router;
