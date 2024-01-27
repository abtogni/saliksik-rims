import express from 'express'
import auth from './auth/authRoutes';
import research from './mainRoutes/researchRoutes';
import presentation from './mainRoutes/presentationRoutes';
import log from './mainRoutes/logRoutes';
import panelists from './mainRoutes/panelistRoutes';

const router = express.Router();

router.use('/user', auth);
router.use('/research',research);
router.use('/research',presentation);
router.use('/research',panelists);
router.use('/logs', log);

export default router;