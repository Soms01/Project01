import { Router } from 'express';
import { createFacultation, getFacultations, updateFacultation, deleteFacultation  } from '../../controllers/facultation.controller';

const router = Router();

router.post('/', createFacultation);
router.get('/', getFacultations);
router.get('/', updateFacultation);
router.get('/', deleteFacultation);

export default router;