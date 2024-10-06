export class OrderItem {
    constructor(
       public product_id: string,
       public quantity: number,
       public order_id: string,
       public unit_price: number,
       public sub_total: number,
       public id?: string
    ) {}
 }