

import { Product as IProduct } from '../entities/Product';

export interface IProductRepository {
   create(product: IProduct): Promise<IProduct>;
   findById(id: string): Promise<IProduct | null>;
   update(id:string,product: IProduct): Promise<IProduct | null>;
   delete(id: string): Promise<void>;
   findAll(): Promise<IProduct[]>;
   searchByCategory(category: string): Promise<IProduct[]>;
   findExistingProduct(name: string,category:string): Promise<IProduct | null>;
}