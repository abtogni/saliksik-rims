import { Router }  from 'express';
import { getUsers, createUser, getUser } from '../../controllers/auth/userController';

const router = Router();

router.get('/getUsers', getUsers);
router.get('/getUser', getUser);
router.post('/createAccount', createUser);


export default router;