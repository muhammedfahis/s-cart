import express from 'express';
import { Container } from "inversify";
import { IOrderRepository } from '../interfaces/IOrderRepository';
import { INTERFACE_TYPE } from '../utils/appCont';
import { OrderRepository } from '../repositories/orderRepository';
import { IOrderInteractor } from '../interfaces/IOrderInteractor';
import { OrderInteractor } from '../interactors/orderInteractor';
import { OrderController } from '../controllers/orderController';



const container = new Container();

container.bind<IOrderRepository>(INTERFACE_TYPE.OrderRepository).to(OrderRepository);
container.bind<IOrderInteractor>(INTERFACE_TYPE.OrderInteractor).to(OrderInteractor);
container.bind(INTERFACE_TYPE.OrderController).to(OrderController);

const router = express.Router();

const controller = container.get<OrderController>(INTERFACE_TYPE.OrderController);

router.get('/list',controller.getOrder)

export { router as OrderRouter} ;