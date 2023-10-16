import express, { Request, Response } from 'express';
import { createResearch, getResearches, getResearch, updateResearch, deleteResearch } from '../controllers/researchController';

const router = express.Router();


router.get('/api/client/getUserResearches', getResearches);

router.get('/api/client/getResearch', getResearch);

router.post('/api/client/createResearch', createResearch);

router.patch('/api/client/updateResearch', updateResearch);

router.delete('/api/client/deleteResearch', deleteResearch);

export default router;


