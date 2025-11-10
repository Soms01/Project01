// src/routes/v1/client.routes.ts
import { Router } from 'express';
import { createApplication, getApplications, getApplicationById, updateApplicationStatus  } from 
'../../controllers/Application.controller';

const router = Router();

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.get('/', updateApplicationStatus);

export default router;