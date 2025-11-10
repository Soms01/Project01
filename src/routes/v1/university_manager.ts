import { Router } from 'express';
import { createUniveManager, getUniveManagers  } from '../../controllers/university_manager.controller';

const router = Router();

router.post('/', createUniveManager);
router.get('/', getUniveManagers);

export default router;