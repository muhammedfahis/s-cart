import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const createCartValidator = [
    body('item')
    .isObject()
    .withMessage('Please Provide item to add.'),

  body('item.product')
    .custom((input) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Product Provide a valid Product ID'),

  body('item.unitPrice')
    .isFloat({ gt: 0 })
    .withMessage('Unit price must be a positive number'),

  body('item.quantity')
    .isFloat({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),

   (req:Request, res:Response, next:NextFunction) => {
    console.log('createCartValidator middleware executed');
    next();
  }
];

