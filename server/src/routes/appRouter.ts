const { Router } = require('express');
const authRoutes = require('./auth/authRouter');

const router = Router();
router.use(authRoutes);


export default router;