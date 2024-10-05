import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createProductValidator = [
  body('name')
    .not()
    .isEmpty()
    .withMessage('Please enter a valid name'),
  
  body('price')
    .isFloat({ gt: 0})
    .withMessage('Please enter a valid price'),

    body('quantity')
    .isFloat({ gt: 0})
    .withMessage('Please enter a valid quantity'),

  body('category')
   .trim()
   .not()
   .isEmpty()
   .withMessage('Please enter a valid category'),
  body('description')
   .not()
   .isEmpty()
   .withMessage('Please enter a valid description'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('createProductValidator middleware executed');
    next();
  }
];
 

