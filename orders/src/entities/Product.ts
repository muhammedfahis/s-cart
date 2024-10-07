export class Product {
    constructor(
        public name: string,
        public price: number,
        public category: string,
        public quantity: number,
        public imageUrl?: string,
        public description?: string,
        public id?: string,
    ) {

    }
}