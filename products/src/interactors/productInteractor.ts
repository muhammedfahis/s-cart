import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IProductInteractor } from "../interfaces/IProductInteractor";
import { IProductRepository } from "../interfaces/IProductRepository";
import { Product } from "../entities/Product";
import { BadRequestError } from "@fayisorg/common-modules";

@injectable()
export class ProductInteractor implements IProductInteractor {
    private productRepository: IProductRepository;
    constructor(@inject(INTERFACE_TYPE.ProductRepository) productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }
    async updateStock(product: { product_id: string, quantity: number }[]): Promise<void> {
       await Promise.all(product.map( async proItem => {
        const existingProduct = await this.productRepository.findById(proItem.product_id);
        if(!existingProduct) {
            throw new Error('Product not found');
        }
        console.log(proItem.quantity,'qlentity');
        
        existingProduct.quantity += proItem.quantity;
        await this.productRepository.updateStock(existingProduct)
       }))
        return;
    }
   async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }
   async getProductById(id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(id);
        if(!product) {
            throw new BadRequestError('Product not found');
        }
        return product;
    }
   async createProduct(product: Product): Promise<Product> {
        const existingProduct = await this.productRepository.findExistingProduct(product.name, product.category);
        if(existingProduct) {
            throw new Error('Product already exists');
        }
        return await this.productRepository.create(product);
    }
   async updateProduct(id: string, product: Product): Promise<Product | null> {
        const existingProduct = await this.productRepository.findById(id);
        if(!existingProduct) {
            throw new BadRequestError('Product not found');
        }
        return await this.productRepository.update(id, product);
    }
   async deleteProduct(id: string): Promise<void> {
        const existingProduct = await this.productRepository.findById(id);
        if(!existingProduct) {
            throw new BadRequestError('Product not found');
        }
        return await this.productRepository.delete(id)
    }

}