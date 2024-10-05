import express from 'express';
import { INTERFACE_TYPE } from '../utils/appCont';

import { UserController } from '../controllers/userController';
import { requireAuth, validateRequest } from '@fayisorg/common-modules';
import { createUserValidator } from '../validators/createUserValidator';
import { loginValidator } from '../validators/loginValidator';
import { blockUserValidator } from '../validators/blockuserValidator';

import { appContainer as container } from '../appContainer';



const router = express.Router();

const controller = container.get<UserController>(INTERFACE_TYPE.UserController);


router.post('/create',createUserValidator,validateRequest,controller.createUser.bind(controller));
router.post('/login',loginValidator,validateRequest, controller.login.bind(controller));
router.post('/logout',requireAuth,controller.logout.bind(controller));
router.post('/block/:id',requireAuth,blockUserValidator,validateRequest,controller.blockUser.bind(controller));
router.post('/unblock/:id',requireAuth,blockUserValidator,validateRequest,controller.unBlockUser.bind(controller));



export { router as UserRouter} ;