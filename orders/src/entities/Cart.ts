import { CartItem as ICartItem } from "./CartItem";

export enum CartStatus {
    Active = 'Active',
    Ordered = 'Ordered',
    Abandoned = 'Abandoned'
}

export class Cart {
    constructor(
        public userId: string,
        public items: ICartItem[],
        public totalPrice: number,
        public status: CartStatus,
        public id?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {
    }
}