import express, { Request, Response } from 'express';
import { createProposal, getProposals, getProposal, updateProposal, deleteProposal } from '../../controllers/mainRoutes/proposalController';

const router = express.Router();


router.get('/api/proposal/getProposals', getProposals);

router.get('/api/proposal/getProposal', getProposal);

router.post('/api/proposal/createProposal', createProposal);

router.patch('/api/proposal/updateProposal', updateProposal);

router.delete('/api/proposal/deleteProposal', deleteProposal);

export default router;