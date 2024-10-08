import { OrderItem } from "./OrderItem";

export enum OrderStatus {
   Placed = 'placed',
   Shipped = 'shipped',
   Delivered = 'delivered',
   Cancelled = 'cancelled',
   ReturnRequested = 'return_requested',
   Returned = 'returned'
}


export class Order {
   constructor(
      public total_price: number,
      public customer_id: string,
      public ordered_date: Date,
      public status:OrderStatus,
      public id?: string,
      public items?: OrderItem[],
      public createdAt?: Date,
      public updatedAt?: Date,
   ) {}
}