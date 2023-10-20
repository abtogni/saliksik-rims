import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/userModel'


export const requireAuth = (req: Request, res: Response , next: NextFunction) =>{
    const token = req.cookies.jwt;

    if (token){
        jwt.verify(token, 'unc research office', (err: any, decodedToken: any)=>{
            if(err){
                console.log(err.message);
                res.redirect('/');
            }else{
                res.json('working!');
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/');
    }

    next();
}

//check current user
export const checkUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err: any, decodedToken: any) => {
      if (err) {
        res.locals.user = null;
        res.redirect('/main');
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
