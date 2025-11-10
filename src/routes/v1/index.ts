import { Router } from 'express';
import application from './application';
import city from './city';
import facultation from './facultation';
import practice_place_manager from './practice_place_manager';
import practice_place_rating from './practice_place_rating';
import practice_place from './practice_place';
import specialization from './specialization';
import student from './student';
import task from './task';
import university_manager from './university_manager';
import auth from './auth';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/application',application);
router.use('/city',city);
router.use('/facultation',facultation );
router.use('/practice_place_manager',practice_place_manager );
router.use('/practice_place_rating',practice_place_rating );
router.use('/practice_place',practice_place );
router.use('/specialization',specialization );
router.use('/student',student );
router.use('/task',task );
router.use('/university_manager',university_manager );
router.use('/users', users); 
export default router;
