import { Container } from "inversify";
import { IOrderRepository } from './interfaces/IOrderRepository';
import { INTERFACE_TYPE } from './utils/appCont';
import { OrderRepository } from './repositories/orderRepository';
import { IOrderInteractor } from './interfaces/IOrderInteractor';
import { OrderInteractor } from './interactors/orderInteractor';
import { OrderController } from './controllers/orderController';
import { OrderItemRepository } from './repositories/orderItemRepository';
import { ProductRepository } from "./repositories/productRepository";
import { ProductInteractor } from "./interactors/productInteractor";
import { CartInteractor } from "./interactors/cartInteractor";
import { CartRepository } from "./repositories/cartRepository";
import { CartController } from "./controllers/cartController";

const container = new Container();

container.bind<IOrderRepository>(INTERFACE_TYPE.OrderRepository).to(OrderRepository);
container.bind<IOrderInteractor>(INTERFACE_TYPE.OrderInteractor).to(OrderInteractor);
container.bind<OrderItemRepository>(INTERFACE_TYPE.OrderItemRepository).to(OrderItemRepository);
container.bind<ProductRepository>(INTERFACE_TYPE.ProductRepository).to(ProductRepository);
container.bind<ProductInteractor>(INTERFACE_TYPE.ProductInteractor).to(ProductInteractor);
container.bind<CartInteractor>(INTERFACE_TYPE.CartInteractor).to(CartInteractor);
container.bind<CartRepository>(INTERFACE_TYPE.CartRepository).to(CartRepository);


container.bind(INTERFACE_TYPE.OrderController).to(OrderController);
container.bind(INTERFACE_TYPE.CartController).to(CartController);


export { container as appContainer };