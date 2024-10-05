
import { User as IUser } from "../entities/User";


export interface IUserRepository {
    create(email: string, password: string, firstName: string, lastName: string,status:boolean): Promise<IUser>;
    findOne(id: string): Promise<IUser | null>;
    findExistingUser(email: string): Promise<IUser | null>;
    blockUser(id: string): Promise<IUser | null>;
    unBlockUser(id: string): Promise<IUser | null>;
}