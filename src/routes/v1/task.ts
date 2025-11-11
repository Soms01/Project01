import { Router } from 'express';
import { createTask, getTasksByApplication } from 
'../../controllers/tasks.controller';

const router = Router();

router.post('/', createTask);
router.get('/', getTasksByApplication);

export default router;