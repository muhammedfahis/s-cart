
import { Order as IOrder, OrderStatus } from '../entities/Order';


export interface IOrderRepository {
    create(order: IOrder): Promise<IOrder>;
    findAll(): Promise<IOrder[]>;
    findById(id: string): Promise<IOrder | null>;
    updateStatus(id: string, status: OrderStatus): Promise<IOrder | null>;
}