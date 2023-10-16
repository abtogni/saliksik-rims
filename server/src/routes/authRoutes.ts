import express, { Request, Response } from 'express'

const auth = express.Router();

auth.get('/api/signup', (req : Request, res : Response) => {
    res.json({message: 'signup page'});
})

export default auth;