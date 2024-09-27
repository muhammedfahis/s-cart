import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IProductRepository } from "../interfaces/IProductRepository";

@injectable()
export class ProductInteractor implements IProductInteractor {
    private productRepository: IProductRepository;
    constructor(@inject(INTERFACE_TYPE.ProductRepository) productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

}