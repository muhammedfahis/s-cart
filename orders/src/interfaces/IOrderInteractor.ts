
import { Order as IOrder, OrderStatus } from '../entities/Order';
import { OrderItem as IOrderItem } from '../entities/OrderItem';

export interface IOrderInteractor {
    createOrder(order: IOrder, orderItems: IOrderItem[]): Promise<IOrder>;
    getAllOrders(): Promise<IOrder[]>;
    getOrderById(id: string): Promise<IOrder | null>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<IOrder | null>;
}