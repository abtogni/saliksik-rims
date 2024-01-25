import express, { Request, Response } from 'express';
import { getUserLogs } from '../../controllers/mainRoutes/logController';

const router = express.Router();

router.get('/getUserLogs', getUserLogs);

router.get('/getLogs', getLogs);

router.post('/createLog', createLog);

router.patch('/updateLog', updateLog);

router.delete('/deleteLog', deleteLog);

export default router;