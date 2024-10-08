
import { Product as IProduct } from '../entities/Product';
import { OrderItem as IOrderItem } from '../entities/OrderItem';

export interface IProductRepository {
    create(order: IProduct): Promise<IProduct>;
    update(order: IProduct): Promise<IProduct>;
    findOne(id: string): Promise<IProduct | null>;
    delete(id: string): Promise<void>;
    updateStock(products:IOrderItem[]): Promise<void>

}