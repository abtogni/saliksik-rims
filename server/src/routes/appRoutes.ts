import express, { Request, Response } from 'express'
import auth from './authRoutes';
import research from './researchRoutes';

const router = express.Router();

router.use(auth);
router.use(research);

export default router;