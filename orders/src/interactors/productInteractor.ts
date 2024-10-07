import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { Product as IProduct } from "../entities/Product";
import { BadRequestError } from "@fayisorg/common-modules";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IProductRepository } from "../interfaces/IProductRepository";

@injectable()
export class ProductInteractor implements IProductInteractor {
    private productRepository: IProductRepository;
    constructor(@inject(INTERFACE_TYPE.ProductRepository) productRepository: IProductRepository) {
        this.productRepository = productRepository;

    }
   async deleteProduct(id: string): Promise<void> {
        const existingProduct = await this.productRepository.findOne(id);
        if (!existingProduct) {
            throw new BadRequestError("Product not found");
        }
        await this.productRepository.delete(id);
        return;
    }
  async updateProduct(id: string,product: IProduct): Promise<IProduct> {
        const existingProduct = this.productRepository.findOne(id);
        if (!existingProduct) {
            throw new BadRequestError("Product not found");
        }
        return this.productRepository.update(product);
    }
 async createProduct(product: IProduct): Promise<IProduct> {
    console.log(product,'intera');
    
        const newProduct = await this.productRepository.create(product);
        return newProduct;
    }


}