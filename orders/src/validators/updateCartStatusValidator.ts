import { body, param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { CartStatus } from '../entities/Cart';

export const updateCartStatusValidator = [
    param('id')
    .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
    .withMessage('Please enter a valid id'),
    body('status')
    .isIn(Object.values(CartStatus))
    .withMessage('Please Provide a valid status'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('updateCartStatusValidator middleware executed');
    next();
  }
];

