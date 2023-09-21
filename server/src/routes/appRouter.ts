const { Router } = require('express');
const authController = require('../controllers/auth/authController');

const router = Router();
router.post('/api/signup', authController.signup_post);
router.post('/api/login', authController.login_post);
router.get('/api/logout', authController.logout);


export default router;