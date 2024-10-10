import { body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import zod from 'zod';

// export const loginValidator = [
//   body('email')
//     .isEmail()
//     .withMessage('Please enter a valid email'),
  
//   body('password')
//     .not()
//     .isEmpty()
//     .withMessage('Please enter valid email'),
//    (req:Request, res:Response, next:NextFunction) => {
//     console.log('loginValidator middleware executed');
//     next();
//   }
// ];

export const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4).max(10),
})