import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createUserValidator = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage('Password must be between 4 and 10 characters long'),
  body('firstName')
   .trim()
   .isLength({ min: 2, max: 50 })
   .withMessage('First name must be between 2 and 50 characters long'),
  body('lastName')
   .trim()
   .isLength({ min: 2, max: 50 })
   .withMessage('Last name must be between 2 and 50 characters long'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('createUserValidator middleware executed');
    next();
  }
];

