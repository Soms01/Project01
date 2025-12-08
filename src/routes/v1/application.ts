// src/routes/v1/tourOrder.routes.ts
import { Router } from 'express';
import { applicationController  } from '../../controllers/Aplication.Controller';
import { validatorCreateApplication } from '../../middleware/validation/validatorstudents/validatorapplication';

const router = Router();

router.post('/', [validatorCreateApplication], applicationController.create);
router.get('/',  applicationController.getAll);
router.get('/:id', applicationController.getById);
router.patch('/:id', applicationController.update);
router.delete('/:id', applicationController.delete);


export default router;