import mongoose from "mongoose";
import { toHash } from "../helper";


export interface UserAttr {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    status: boolean;
}

export interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    status: boolean;
}
export interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: UserAttr): UserDoc;
}


const userSchema = new mongoose.Schema<UserDoc>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    status: { type: Boolean, default: true },
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    toJSON: {
        transform: (doc, ret) => {
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
            return ret;
        }
    }
});

userSchema.pre('save', async function(done) {
    if(this.isModified('password')) {
        const hashed = await toHash(this.get('password'));
        this.set('password',hashed);
    }
    done();
});

userSchema.statics.build = (attr: UserAttr): UserDoc => new User(attr);


export const User = mongoose.model<UserDoc, UserModel>("User", userSchema);
