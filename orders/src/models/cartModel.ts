import mongoose from "mongoose";
import { CartStatus } from "../entities/Cart";
import { CartItem as ICartItem } from "../entities/CartItem";
import { cartItemSchema } from "./cartItemModel";


export interface CartAttr {
    userId: string; 
    items: ICartItem[];
    totalPrice: number;
    status: CartStatus;
}

export interface CartDoc extends mongoose.Document {
    id: string
    userId: string; 
    items: ICartItem[];
    totalPrice: number;
    status: CartStatus;
    createdAt: Date,
    updatedAt: Date,
}
export interface CartModel extends mongoose.Model<CartDoc> {
    build(attr: CartAttr): CartDoc;
}


const cartSchema = new mongoose.Schema<CartDoc>({
    userId: {
        type: String,
        required: true, // Null for guest users
    },
    items: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    status: {
        type: String,
        enum: Object.values(CartStatus),
    },
    createdAt: {
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




cartSchema.statics.build = (attr: CartDoc): CartDoc => new Cart(attr);


export const Cart = mongoose.model<CartDoc, CartModel>("Cart", cartSchema);
