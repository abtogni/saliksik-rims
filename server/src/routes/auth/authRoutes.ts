import { Request, Response, Router } from 'express'
import { getUsers, createUser, getUser, updateUser } from '../../controllers/auth/userController';

const router = Router();

router.get('/getUsers', getUsers);
router.get('/getUser', getUser);
router.post('/createAccount', createUser);
router.post('/updateAccount', updateUser);


export default router;