import { Router } from 'express';
import { createRating, getRatings  } from '../../controllers/practice_place_rating.controller';

const router = Router();

router.post('/', createRating);
router.get('/', getRatings);



export default router;