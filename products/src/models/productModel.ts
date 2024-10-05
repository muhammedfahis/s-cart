import mongoose from "mongoose";




export interface ProductAttr {
   name: string;
   price: number;
   quantity: number;
   category: string;
   imageUrl?: string;
   description?: string;
}

export interface ProductDoc extends mongoose.Document {
    name: string;
    price: number;
    quantity: number;
    category: string;
    imageUrl: string;
    description: string;
}
export interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attr: ProductAttr): ProductDoc;
}


const productSchema = new mongoose.Schema<ProductDoc>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
},{
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
            return ret;
        }
    }
});



productSchema.statics.build = (attr: ProductDoc): ProductDoc => new Product(attr);


export const Product = mongoose.model<ProductDoc, ProductModel>("User", productSchema);
