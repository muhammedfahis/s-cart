import { injectable } from "inversify";
import { IProductRepository } from "../interfaces/IProductRepository";
import { Product as IProduct } from "../entities/Product";
import { Product } from "../models/productModel";


@injectable()
export class ProductRepository implements IProductRepository {
    async updateStock(product: IProduct): Promise<void> {
        const updatedProduct = await Product.findByIdAndUpdate(product.id, { quantity: product.quantity }, { new: true }).exec();
        return;
    }
   async findExistingProduct(name: string, category: string): Promise<IProduct | null> {
        return await Product.findOne({ name, category }).exec();
    }
   async create(product: IProduct): Promise<IProduct> {
        const newProduct = Product.build(product);
        await newProduct.save();
        return newProduct;
    }
   async findById(id: string): Promise<IProduct | null> {
        return await Product.findById(id).exec();
    }
   async update(id: string,product: IProduct): Promise<IProduct | null> {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true }).exec();
        return updatedProduct;
    }
   async delete(id: string): Promise<void> {
         await Product.deleteOne({ _id: id}).exec();
         return;
    }
    findAll(): Promise<IProduct[]> {
        return Product.find().exec();
    }
    searchByCategory(category: string): Promise<IProduct[]> {
        return Product.find({ category }).exec();
    }
 
}