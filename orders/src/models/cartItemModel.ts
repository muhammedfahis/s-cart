import mongoose from "mongoose";
import { CartStatus } from "../entities/Cart";
import { CartItem as ICartItem } from "../entities/CartItem";
import { Product as IProduct } from "../entities/Product";

export interface CartItemAttr {
    product: IProduct;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    addedAt: Date;
}

export interface CartItemDoc extends mongoose.Document {
    id: string;
    product: IProduct;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    addedAt: Date;
    updatedAt: Date,
}
export interface CartItemModel extends mongoose.Model<CartItemDoc> {
    build(attr: CartItemAttr): CartItemDoc;
}


export const cartItemSchema = new mongoose.Schema<CartItemDoc>({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    unitPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
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




cartItemSchema.statics.build = (attr: CartItemDoc): CartItemDoc => new CartItem(attr);


export const CartItem = mongoose.model<CartItemDoc, CartItemModel>("CartItem", cartItemSchema);
