import mongoose from "mongoose";
import { OrderStatus } from "../entities/Order";


export interface OrderAttr {
    total_price: number,
    customer_id: string,
    ordered_date: Date,
    status: OrderStatus,
}

export interface OrderDoc extends mongoose.Document {
    total_price: number,
    customer_id: string,
    ordered_date: Date,
    status: OrderStatus,
    createdAt: Date,
    updatedAt: Date,
}
export interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attr: OrderAttr): OrderDoc;
}


const orderSchema = new mongoose.Schema<OrderDoc>({
    total_price: {
        type: Number,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    ordered_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(OrderStatus),
        required: true
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

orderSchema.virtual('orderItems', {
    ref: 'OrderItem', // The model to use
    localField: '_id', // Find OrderItems where `order_id` equals `_id` of Order
    foreignField: 'order_id' // The field in OrderItem that references Order
});

// 8. Ensure that virtuals are included when converting to JSON
orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });


orderSchema.statics.build = (attr: OrderDoc): OrderDoc => new Order(attr);


export const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);
