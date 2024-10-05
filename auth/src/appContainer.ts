
import { Container } from "inversify";

import { IUserRepository } from './interfaces/IUserRepository';
import { UserRepository } from './repositories/userRepository';
import { IUserInteractor } from './interfaces/IUserInteractor';
import { UserInteractor } from './interactors/userInteractor';
import { INTERFACE_TYPE } from './utils/appCont';
import { UserController } from './controllers/userController';

const container = new Container();

container.bind<IUserRepository>(INTERFACE_TYPE.UserRepository).to(UserRepository);
container.bind<IUserInteractor>(INTERFACE_TYPE.UserInteractor).to(UserInteractor);
container.bind(INTERFACE_TYPE.UserController).to(UserController);

export { container as appContainer} ;