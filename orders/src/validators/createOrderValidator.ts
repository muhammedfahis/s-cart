import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const createOrderValidator = [
    body('items')
    .isArray({ min: 1 })
    .withMessage('Items must be an array with at least one item'),

  // Validate each item in the 'items' array
  body('items.*.product_id')
    .isString()
    .withMessage('Product ID must be a string'),

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
// {
//     "items":[
//       {
//         "product_id" :"asgsfag",
//         "unit_price":20,
//         "quantity":2
//       },
//           {
//         "product_id" :"asgsasdfas",
//         "unit_price":40,
//         "quantity":5
//       }
//       ]
//   }

