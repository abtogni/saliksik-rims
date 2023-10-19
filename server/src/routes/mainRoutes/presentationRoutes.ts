import express, { Request, Response } from 'express';
import { createPresentation, getPresentations, getPresentation, updatePresentation, deletePresentation } from '../../controllers/mainRoutes/presentationController';

const router = express.Router();


router.get('/api/presentation/getPresentations', getPresentations);

router.get('/api/presentation/getPresentation', getPresentation);

router.post('/api/presentation/createPresentation', createPresentation);

router.patch('/api/presentation/updatePresentation', updatePresentation);

router.delete('/api/presentation/deletePresentation', deletePresentation);

export default router;


