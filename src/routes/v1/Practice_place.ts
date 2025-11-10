// src/routes/v1/client.routes.ts
import { Router } from 'express';
import { createPracticePlace, getPracticePlaces, getPracticePlaceById, updatePracticePlace, deletePracticePlace  } from 
'../../controllers/Practice_place.Controller';

const router = Router();

router.post('/', createPracticePlace);
router.get('/', getPracticePlaces);
router.get('/:id', getPracticePlaceById);
router.get('/', updatePracticePlace);
router.get('/', deletePracticePlace);

export default router;