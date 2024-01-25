import express from 'express'
import auth from './auth/authRoutes';
import research from './mainRoutes/researchRoutes';
import presentation from './mainRoutes/presentationRoutes';
import log from './mainRoutes/logRoutes';

const router = express.Router();

router.use('/user', auth);
router.use('/research',research);
router.use('/presentation',presentation);
router.use('/logs', log);

export default router;