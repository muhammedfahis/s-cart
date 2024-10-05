
import { Product as IProduct } from '../entities/Product';

export interface IProductInteractor {
    getAllProducts(): Promise<IProduct[]>;
    getProductById(id: string): Promise<IProduct | null>;
    createProduct(product: IProduct): Promise<IProduct>;
    updateProduct(id: string, product: IProduct): Promise<IProduct | null>;
    deleteProduct(id: string): Promise<void>;
}