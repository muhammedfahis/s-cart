import { param, body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { OrderStatus } from '../entities/Order';


export const updateOrderStatusValidator = [
  body('status')
    .not()
    .isEmpty()
    .isIn(Object.values(OrderStatus))
    .withMessage('Please provide a valid status'),
  param('id')
   .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
   .withMessage('Please enter a valid id'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('updateOrderStatusValidator middleware executed');
    next();
  }
];