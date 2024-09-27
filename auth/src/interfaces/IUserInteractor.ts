import { User as IUser } from "../entities/User";

export interface IUserInteractor {
   createUser(email: string, password: string, firstName: string, lastName: string,status:boolean): Promise<{ user:IUser ,token:string}>;
   login(email: string, password: string): Promise<{ user:IUser, token:string }>;
   findExistingUser(email: string): Promise<IUser | null>;
   blockUser(id:string): Promise<IUser | null>;
}