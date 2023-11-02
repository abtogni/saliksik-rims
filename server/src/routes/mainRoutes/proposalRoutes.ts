import express from 'express';
import { createProposal, getProposals, getProposalsByID, getProposal, updateProposal, deleteProposal } from '../../controllers/mainRoutes/proposalController';

const router = express.Router();

router.get('/getProposals', getProposals);

router.get('/getProposalsByID', getProposalsByID);

router.get('/getProposal', getProposal);

router.post('/createProposal', createProposal);

router.patch('/updateProposal', updateProposal);

router.delete('/deleteProposal', deleteProposal);

export default router;