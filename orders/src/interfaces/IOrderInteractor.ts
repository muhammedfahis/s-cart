
import { Order as IOrder, OrderStatus } from '../entities/Order';
import { OrderItem as IOrderItem } from '../entities/OrderItem';

export interface IOrderInteractor {
    createOrder(customer_id: string, orderItems: IOrderItem[]): Promise<IOrder>;
    getAllOrders(): Promise<IOrder[]>;
    getOrderById(id: string): Promise<IOrder | null>;
    updateOrderStatus(id: string, status: OrderStatus): Promise<IOrder | null>;
    updateStock(products: IOrderItem[]): Promise<void>
}