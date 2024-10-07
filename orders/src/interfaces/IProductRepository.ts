
import { Product as IProduct } from '../entities/Product';
export interface IProductRepository {
    create(order: IProduct): Promise<IProduct>;
    update(order: IProduct): Promise<IProduct>;
    findOne(id: string): Promise<IProduct | null>;
    delete(id: string): Promise<void>;

}