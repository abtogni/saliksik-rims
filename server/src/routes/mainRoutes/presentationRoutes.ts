import express, { Request, Response } from 'express';
import { createPresentation, getPresentations, getPresentation, updatePresentation, deletePresentation } from '../../controllers/mainRoutes/presentationController';

const router = express.Router();


router.get('/getPresentations', getPresentations);

router.get('/getPresentation', getPresentation);

router.post('/createPresentation', createPresentation);

router.patch('/updatePresentation', updatePresentation);

router.delete('/deletePresentation', deletePresentation);

export default router;


