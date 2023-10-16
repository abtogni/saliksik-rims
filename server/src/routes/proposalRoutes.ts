import express, { Request, Response } from 'express';
import { createProposal, getProposals, getProposal, updateProposal, deleteProposal } from '../controllers/proposalController';

const router = express.Router();


router.get('/api/client/getProposals', getProposals);

router.get('/api/client/getProposal', getProposal);

router.post('/api/client/createProposal', createProposal);

router.patch('/api/client/updateProposal', updateProposal);

router.delete('/api/client/deleteProposal', deleteProposal);

export default router;