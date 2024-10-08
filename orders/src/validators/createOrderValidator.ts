import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const createOrderValidator = [
    body('items')
    .isArray({ min: 1 })
    .withMessage('Items must be an array with at least one item'),

  // Validate each item in the 'items' array
  body('items.*.product_id')
  .custom((input) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('Product Provide a valid Product ID'),

  body('items.*.unit_price')
    .isFloat({ gt: 0 })
    .withMessage('Unit price must be a positive number'),

  body('items.*.quantity')
    .isInt({ gt: 0 })
    .withMessage('Quantity must be a positive integer'),

   (req:Request, res:Response, next:NextFunction) => {
    console.log('createOrderValidator middleware executed');
    next();
  }
];


