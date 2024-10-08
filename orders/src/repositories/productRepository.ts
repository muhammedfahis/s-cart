import { injectable } from "inversify";
import { Product } from "../models/productModel";
import { Product as IProduct } from "../entities/Product";
import { OrderItem as IOrderItem } from "../entities/OrderItem";

import { IProductRepository } from "../interfaces/IProductRepository";
import mongoose from "mongoose";

@injectable()
export class ProductRepository implements IProductRepository {
   async updateStock(products:IOrderItem[]): Promise<void> {
    console.log(products,"data2");
    const bulkOps = products.map(product => ({
        updateOne: {
          filter: { _id: new mongoose.Types.ObjectId(product.product_id) },
          update: { $inc: { quantity: product.quantity } },
        }
      }));
      const result = await Product.bulkWrite(bulkOps);
      return;
    }
   async delete(id: string): Promise<void> {
        await Product.deleteOne({ _id: id });
    }
   async findOne(id: string): Promise<IProduct | null> {
        return await Product.findById(id)
    }
    async create(product: IProduct): Promise<IProduct> {
        const newProduct = Product.build({
            _id: new mongoose.Types.ObjectId(product.id),
            quantity: product.quantity,  // Assuming id is provided in the constructor
            name: product.name,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            description: product.description
        });
        console.log(newProduct);
        await newProduct.save();
        return newProduct;
    }
    async update(product: IProduct): Promise<IProduct> {
        const newProduct = await Product.findByIdAndUpdate(product.id, {
            quantity: product.quantity, 
            name: product.name,
            price: product.price,
            category: product.category,
            imageUrl: product.imageUrl,
            description: product.description
        });
        return newProduct!;
    }

}