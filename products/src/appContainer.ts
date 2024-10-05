
import { Container } from "inversify";
import { IProductRepository } from './interfaces/IProductRepository';
import { INTERFACE_TYPE } from './utils/appCont';
import { ProductRepository } from './repositories/productRepository';
import { IProductInteractor } from './interfaces/IProductInteractor';
import { ProductInteractor } from './interactors/productInteractor';
import { ProductController } from './controllers/productController';


const container = new Container();

container.bind<IProductRepository>(INTERFACE_TYPE.ProductRepository).to(ProductRepository);
container.bind<IProductInteractor>(INTERFACE_TYPE.ProductInteractor).to(ProductInteractor);
container.bind(INTERFACE_TYPE.ProductController).to(ProductController);


export { container as appContainer } ;