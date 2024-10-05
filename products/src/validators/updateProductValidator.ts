import { body, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const updateProductValidator = [
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
  param('id')
   .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
   .withMessage('Please enter a valid id'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('updateProductValidator middleware executed');
    next();
  }
];
 

