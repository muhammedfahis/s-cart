import express from 'express';
import { Container } from "inversify";
import { IUserRepository } from '../interfaces/IUserRepository';
import { INTERFACE_TYPE } from '../utils/appCont';
import { UserRepository } from '../repositories/userRepository';
import { IUserInteractor } from '../interfaces/IUserInteractor';
import { UserInteractor } from '../interactors/userInteractor';
import { UserController } from '../controllers/userController';
import { requireAuth, validateRequest } from '@fayisorg/common-modules';
import { createUserValidator } from '../validators/createUserValidator';
import { loginValidator } from '../validators/loginValidator';
import { blockUserValidator } from '../validators/blockuserValidator';

const container = new Container();

container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);
container.bind(INTERFACE_TYPE.UserController).to(UserController);

const router = express.Router();

const controller = container.get<UserController>(INTERFACE_TYPE.UserController);


router.post('/create',createUserValidator,validateRequest,controller.createUser.bind(controller));
router.post('/login',loginValidator,validateRequest, controller.login.bind(controller));
router.post('/logout',requireAuth,controller.logout.bind(controller));
router.post('/block/:id',requireAuth,blockUserValidator,validateRequest,controller.blockUser.bind(controller));



export { router as UserRouter} ;