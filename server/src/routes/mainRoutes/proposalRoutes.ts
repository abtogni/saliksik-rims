import express, { Request, Response } from 'express';
import { createProposal, getProposals, getProposal, updateProposal, deleteProposal } from '../../controllers/mainRoutes/proposalController';

const router = express.Router();


router.get('/getProposals', getProposals);

router.get('/getProposal', getProposal);

router.post('/createProposal', createProposal);

router.patch('/updateProposal', updateProposal);

router.delete('/deleteProposal', deleteProposal);

export default router;