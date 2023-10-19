import express, { Request, Response } from 'express';
import { createPresentation, getPresentations, getPresentation, updatePresentation, deletePresentation } from '../../controllers/mainRoutes/presentationController';

const router = express.Router();


router.get('/api/research/getPresentations', getPresentations);

router.get('/api/research/getPresentation', getPresentation);

router.post('/api/research/createPresentation', createPresentation);

router.patch('/api/research/updatePresentation', updatePresentation);

router.delete('/api/research/deletePresentation', deletePresentation);

export default router;


