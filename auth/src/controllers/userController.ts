import { IUserInteractor } from "../interfaces/IUserInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { BadRequestError } from "@fayisorg/common-modules";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Context } from "../trpc";

@injectable()
export class UserController {
    private userInteractor: IUserInteractor;
    constructor(@inject(INTERFACE_TYPE.UserInteractor) userInteractor: IUserInteractor) {
        this.userInteractor = userInteractor;
    }

    async createUser(input: any,context: Context) {
        const { email, password, firstName, lastName, status= true } = input;
        const { user , token } = await this.userInteractor.createUser(email, password, firstName, lastName, status);      
        context.req.session = { jwt: token };
        return user;
    }

    async login(input: any,context: Context) {
        const { email, password } = input;
        const { user, token } = await this.userInteractor.login(email, password);
        context.req.session = { jwt: token };
        return user;
    }

    async logout(context: Context) {
        console.log(context.req.currentUser);
        context.req.session = null;
        return;
    }

    async blockUser(input: any) {
        const { id } = input;
        const user = await this.userInteractor.blockUser(id);
        return 'Blocked User Successfully.'
    }

    async unBlockUser(input: any) {
        const { id } = input;
        const user = await this.userInteractor.unblockUser(id);
        return 'Unblocked User Successfully.'
    }
}