import { Router } from 'express';
import { createPracticePlace, getPracticePlaces, getPracticePlaceById, updatePracticePlace, deletePracticePlace  } from '../../controllers/Practice_place.Controller';

const router = Router();

router.post('/', createPracticePlace);
router.get('/', getPracticePlaces);
router.get('/:id', getPracticePlaceById);
router.put('/', updatePracticePlace);
router.delete('/:id', deletePracticePlace);


export default router;