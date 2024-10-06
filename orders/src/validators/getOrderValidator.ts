import { param } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const getOrderValidator = [
  param('id')
   .custom((id: string) => mongoose.Types.ObjectId.isValid(id))
   .withMessage('Please enter a valid id'),
   (req:Request, res:Response, next:NextFunction) => {
    console.log('getOrderValidator middleware executed');
    next();
  }
];