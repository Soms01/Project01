import { Router } from 'express';
import { createCity, updateCity, deleteCity, getCities  } from '../../controllers/city.controller';

const router = Router();

router.post('/', createCity);
router.put('/:id', updateCity);
router.get('/:id', getCities);
router.get('/', getCities);
router.delete('/:id', deleteCity);


export default router;