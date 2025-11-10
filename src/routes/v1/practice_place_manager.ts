import { Router } from 'express';
import { createPractiManager, getPractiManagers  } from '../../controllers/practica_manager.controller';

const router = Router();

router.post('/', getPractiManagers);
router.get('/', createPractiManager);


export default router;