import { Router } from 'express';
import { createSpecialition, getSpecialitions } from 
'../../controllers/specialition.controller';

const router = Router();

router.post('/', createSpecialition);
router.get('/', getSpecialitions);

export default router;