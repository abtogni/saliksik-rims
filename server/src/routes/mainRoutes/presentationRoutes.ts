import express, { Request, Response } from 'express';
import { createPresentation, getPresentations, updatePresentation, deletePresentation } from '../../controllers/mainRoutes/presentationController';

const router = express.Router();


router.get('/getPresentations', getPresentations);

router.post('/createPresentation', createPresentation);

router.patch('/updatePresentation', updatePresentation);

router.delete('/deletePresentation', deletePresentation);

export default router;


