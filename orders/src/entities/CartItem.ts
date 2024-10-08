

export class CartItem {
    constructor(
        public product: string,
        public quantity: number,
        public unitPrice: number,
        public totalPrice: number,
        public addedAt: Date,
        public updatedAt: Date
    ) {

    }
}