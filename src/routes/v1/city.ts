import { Router } from 'express';
import { createCity, updateCity, deleteCity, getCities  } from '../../controllers/city.controller';

const router = Router();

router.post('/', createCity);
router.get('/', updateCity);
router.get('/', getCities);
router.get('/', deleteCity);


export default router;