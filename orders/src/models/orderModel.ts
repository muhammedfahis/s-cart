import mongoose from "mongoose";




export interface OrderAttr {
  
}

export interface OrderDoc extends mongoose.Document {

}
export interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attr: OrderAttr): OrderDoc;
}


const orderSchema = new mongoose.Schema<OrderDoc>({

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



orderSchema.statics.build = (attr: OrderDoc): OrderDoc => new Order(attr);


export const Order = mongoose.model<OrderDoc, OrderModel>("User", orderSchema);
