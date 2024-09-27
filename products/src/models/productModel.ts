import mongoose from "mongoose";




export interface ProductAttr {
  
}

export interface ProductDoc extends mongoose.Document {

}
export interface ProductModel extends mongoose.Model<ProductDoc> {
    build(attr: ProductAttr): ProductDoc;
}


const productSchema = new mongoose.Schema<ProductDoc>({

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
