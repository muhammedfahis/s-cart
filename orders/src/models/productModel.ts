import mongoose from "mongoose";




export interface ProductAttr {
   _id: mongoose.Types.ObjectId;
   name: string;
   price: number;
   category: string;
   imageUrl?: string;
   quantity: number;
   description?: string;
}

export interface ProductDoc extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    quantity: number;
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
    },
    quantity: {
        type: Number,
        required: true
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

productSchema.virtual('products', {
    ref: 'OrderItem', // The model to use
    localField: '_id', // Find OrderItems where `product_id` equals `_id` of Order
    foreignField: 'product_id' // Find OrderItems where `product_id` equals `_id` of Order
});

// 8. Ensure that virtuals are included when converting to JSON
productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });



productSchema.statics.build = (attr: ProductDoc): ProductDoc => new Product(attr);


export const Product = mongoose.model<ProductDoc, ProductModel>("Product", productSchema);
