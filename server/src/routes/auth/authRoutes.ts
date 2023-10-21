import { Router }  from 'express';
import { getUsers, createUser, userLogin, userLogout } from '../../controllers/auth/userController';

const router = Router();

router.get('/api/user/getUsers', getUsers);
router.post('/api/user/createAccount', createUser);
router.post('/api/login', userLogin);
router.get('/api/logout', userLogout);


export default router;