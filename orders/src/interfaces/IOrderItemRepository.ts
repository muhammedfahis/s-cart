import { OrderItem as IOrderItem } from '../entities/OrderItem';
import { Order as IOrder } from '../entities/Order';

export interface IOrderItemRepository {
    create(order: IOrderItem[],options?:any): Promise<IOrderItem[]>;
    createWithTransaction(order:IOrder): Promise<IOrder>;
}