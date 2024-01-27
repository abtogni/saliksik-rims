import express from 'express';
import { createPanelist, deletePanelist, getPanelists, updatePanelist } from '../../controllers/mainRoutes/panelistController';

const router = express.Router();


router.get('/getPanelists', getPanelists);

router.post('/createPanelist', createPanelist);

router.post('/updatePanelist', updatePanelist);

router.delete('/deletePanelist', deletePanelist);

export default router;


