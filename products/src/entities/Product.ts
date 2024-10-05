export class Product {
   constructor(
      public name: string,
      public price: number,
      public quantity: number,
      public category: string,
      public id?: string,
      public imageUrl?: string,
      public description?: string
   ) {}
}