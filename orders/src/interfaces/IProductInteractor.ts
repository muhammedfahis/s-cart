import { Product as IProduct } from '../entities/Product';

export interface IProductInteractor {
    createProduct(product:IProduct): Promise<IProduct>;
    updateProduct(id:string,product:IProduct): Promise<IProduct>;
    deleteProduct(id:string): Promise<void>;
}