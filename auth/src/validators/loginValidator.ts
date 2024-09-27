import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .not()
    .isEmpty()
    .withMessage('Please enter valid email'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('createUserValidation middleware executed');
    next();
  }
];