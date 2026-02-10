import { Router } from 'express';

import { login } from 'controllers/auth';
import { checkJwt } from 'middleware/checkJwt';
import { connectDatabase } from 'middleware/connectDatabase';
import { validatorLogin, validatorRegister, validatorChangePassword } from 'middleware/validation/auth';

const router = Router();

router.post('/login', [connectDatabase, validatorLogin], login);

export default router;
