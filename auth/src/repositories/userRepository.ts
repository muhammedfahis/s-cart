import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IUserRepository";
import { User, UserDoc } from "../models/userModel";
import { User as IUser } from '../entities/User';



@injectable()
export class UserRepository implements IUserRepository {
    async unBlockUser(id: string): Promise<IUser | null> {
        const user = await User.findByIdAndUpdate(id, { status: true }, { new: true });
        return user;
    }
    async blockUser(id: string): Promise< IUser | null> {
        const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });
        return user;
    }
   async findExistingUser(email: string): Promise<IUser | null> {
        const user = await User.findOne({ email });
        return user as UserDoc || null;
    }
    async findOne(id: string): Promise<IUser | null> {
        const user = await User.findById(id);
        return user;
    }
    async create(email: string, password: string, firstName: string, lastName: string, status: boolean): Promise<IUser> {
        const user = User.build({ email, password, firstName, lastName, status });
        await user.save();        
        return user;
    }
}