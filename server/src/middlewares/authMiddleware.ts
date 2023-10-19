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
export const checkUser = (requiredUserType: string) => (req : Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'unc research office', async (err: any, decodedToken: any) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        if (user && user.userType === requiredUserType) {
          next();
        } else {
          // User type is not allowed to access the page
          res.status(403).send('Forbidden');
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
