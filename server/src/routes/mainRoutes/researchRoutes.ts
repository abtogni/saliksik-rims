import { Router } from 'express';
import { createResearch, getResearches, getResearch, updateResearch, deleteResearch } from '../../controllers/mainRoutes/researchController';

const router = Router();


router.get('/api/research/getUserResearches', getResearches);

router.get('/api/research/getResearch', getResearch);

router.post('/api/research/createResearch', createResearch);

router.patch('/api/research/updateResearch', updateResearch);

router.delete('/api/research/deleteResearch', deleteResearch);

export default router;


