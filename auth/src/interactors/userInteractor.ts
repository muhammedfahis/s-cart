import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { IUserInteractor } from "../interfaces/IUserInteractor";
import { IUserRepository } from "../interfaces/IUserRepository";
import { BadRequestError } from "@fayisorg/common-modules";
import { signIn, compare } from "../helper";
import { User as IUser } from "../entities/User";

@injectable()
export class UserInteractor implements IUserInteractor {
    private userRepository: IUserRepository;
    constructor(@inject(INTERFACE_TYPE.UserRepository) userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    async unblockUser(id: string): Promise<IUser | null> {
        const existingUser = this.userRepository.findOne(id);
        if (!existingUser) {
            throw new BadRequestError('User not found');
        }
        return await this.userRepository.unBlockUser(id);
    }
    async blockUser(id: string): Promise<IUser | null> {
        const existingUser = this.userRepository.findOne(id);
        if (!existingUser) {
            throw new BadRequestError('User not found');
        }
        return await this.userRepository.blockUser(id);
    }
    findExistingUser(email: string): Promise<IUser | null> {
        return this.userRepository.findExistingUser(email);
    }
    async createUser(email: string, password: string, firstName: string, lastName: string, status: boolean): Promise<any> {
        const existingUser = await this.findExistingUser(email);
        if(existingUser) {
            throw new BadRequestError('Email in use');
        }
        const user = await this.userRepository.create(email, password, firstName, lastName, status);
        if (!user) {
            throw new BadRequestError('somthing went wrong');
        }
        const token = signIn({ email: user.email, id: user.id });
        return { user, token };

    }
    async login(email: string, password: string): Promise<{ user: IUser, token: string }> {
        const existingUser = await this.userRepository.findExistingUser(email);
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials');
        }
        const isPasswordMatch = compare(existingUser.password, password);
        if (!isPasswordMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        const token = signIn({ email: existingUser.email, id: existingUser.id });
        return { user: existingUser, token };
    }

}