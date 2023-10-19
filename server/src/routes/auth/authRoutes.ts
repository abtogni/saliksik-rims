import { Router }  from 'express';
import { getUsers, createUser, userLogin, userLogout } from '../../controllers/auth/userController';
import { checkUser, requireAuth } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/api/user/getUsers', getUsers);
router.post('/api/user/createAccount', createUser);
router.post('/api/login', userLogin);
router.get('/api/logout', userLogout);

router.get('/api/checkAuth', requireAuth);
router.get('/api/checkUser', checkUser);


export default router;