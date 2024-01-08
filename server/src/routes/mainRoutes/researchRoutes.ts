import { Router } from 'express';
import { createResearch, getResearches, getResearch, updateResearch, deleteResearch } from '../../controllers/mainRoutes/researchController';

const router = Router();


router.get('/getResearches', getResearches);

router.get('/getResearch', getResearch);

router.post('/createResearch', createResearch);

router.patch('/updateResearch', updateResearch);

router.delete('/deleteResearch', deleteResearch);

export default router;


