import mongoose, { Schema } from "mongoose";

export interface OrderItemAttr {
    product_id: string;
    quantity: number;
    unit_price: number;
    order_id: string;
    sub_total: number;
}

export interface OrderItemDoc extends mongoose.Document {
    product_id: string;
    quantity: number;
    unit_price: number;
    order_id: mongoose.Types.ObjectId;
    sub_total: number;
    created_at: Date;
    updated_at: Date;
}

export interface OrderItemModel extends mongoose.Model<OrderItemDoc> {
    build(attr: OrderItemAttr): OrderItemDoc;
    buildMany(attrs: OrderItemAttr[]): OrderItemDoc[];
}

const orderItemSchema = new mongoose.Schema<OrderItemDoc, OrderItemModel>({
    product_id: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    sub_total: {
        type: Number,
        required: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            ret.order_id = ret.order_id.toString()
            return ret;
        }
    }
});

orderItemSchema.statics.build = function(attr: OrderItemAttr): OrderItemDoc {
    return new OrderItem({
        ...attr,
        order_id: new mongoose.Types.ObjectId(attr.order_id),
    });
};

orderItemSchema.statics.buildMany = function(attrs: OrderItemAttr[]): OrderItemDoc[] {
    return attrs.map((attr) => new OrderItem({
        ...attr,
        order_id: new mongoose.Types.ObjectId(attr.order_id),
    }));
};

export const OrderItem = mongoose.model<OrderItemDoc, OrderItemModel>("OrderItem", orderItemSchema);