import express, { Request, Response } from 'express'
import auth from './auth/authRoutes';
import research from './mainRoutes/researchRoutes';
import proposal from './mainRoutes/proposalRoutes';
import presentation from './mainRoutes/presentationRoutes';
import { checkUser, requireAuth } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(auth);
router.use(proposal);
router.use(research);
router.use(presentation);

export default router;