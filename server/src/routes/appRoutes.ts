import express from 'express'
import auth from './auth/authRoutes';
import research from './mainRoutes/researchRoutes';
import presentation from './mainRoutes/presentationRoutes';

const router = express.Router();

router.use('/user', auth);
router.use('/research',research);
router.use('/presentation',presentation);

export default router;