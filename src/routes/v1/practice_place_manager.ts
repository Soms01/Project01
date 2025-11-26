import { Router } from 'express';
import { createPractiManager, getPractiManagers  } from '../../controllers/practice_place_manager.controller';

const router = Router();

router.get('/', getPractiManagers);
router.post('/', createPractiManager);


export default router;