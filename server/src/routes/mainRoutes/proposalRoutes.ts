import express, { Request, Response } from 'express';
import { createProposal, getProposals, getProposal, updateProposal, deleteProposal } from '../../controllers/mainRoutes/proposalController';

const router = express.Router();


router.get('/api/research/getProposals', getProposals);

router.get('/api/research/getProposal', getProposal);

router.post('/api/research/createProposal', createProposal);

router.patch('/api/research/updateProposal', updateProposal);

router.delete('/api/research/deleteProposal', deleteProposal);

export default router;