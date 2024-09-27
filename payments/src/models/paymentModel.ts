import mongoose from "mongoose";




export interface PaymentAttr {
  
}

export interface PaymentDoc extends mongoose.Document {

}
export interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attr: PaymentAttr): PaymentDoc;
}


const paymentSchema = new mongoose.Schema<PaymentDoc>({

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



paymentSchema.statics.build = (attr: PaymentDoc): PaymentDoc => new Payment(attr);


export const Payment = mongoose.model<PaymentDoc, PaymentModel>("User", paymentSchema);
