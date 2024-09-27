import { IUserInteractor } from "../interfaces/IUserInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { BadRequestError } from "@fayisorg/common-modules";
import mongoose from "mongoose";

@injectable()
export class UserController {
    private userInteractor: IUserInteractor;
    constructor(@inject(INTERFACE_TYPE.UserInteractor) userInteractor: IUserInteractor) {
        this.userInteractor = userInteractor;
    }

    async createUser(req: any, res: any, next: any) {
       try {
        const { email, password, firstName, lastName, status= true } = req.body;
        const existingUser = await this.userInteractor.findExistingUser(email);
        if(existingUser) {
            throw new BadRequestError('Email in use');
        }
        const { user , token } = await this.userInteractor.createUser(email, password, firstName, lastName, status);      
        req.session = { jwt: token };
        res.status(201).send(user);
       } catch (error: mongoose.Error.ValidationError | any) {
        next(new BadRequestError(error.message));
       }
    }

    async login(req: any, res: any, next: any) {
        try {
        const { email, password } = req.body;
        const { user, token } = await this.userInteractor.login(email, password);
        req.session = { jwt: token };
        res.status(200).send(user);
        } catch (error:mongoose.Error.ValidationError | any) {
            next(new BadRequestError(error.message)); 
        }
    }

    async logout(req: any, res: any, next: any) {
        console.log(req.currentUser);
        req.session = null;
        res.status(200).send({ message: 'Logged out successfully' });
    }

    async blockUser(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const user = await this.userInteractor.blockUser(id);
            res.status(200).send({ message: 'User blocked successfully' });
        } catch (error:mongoose.Error.ValidationError | any) {
            next(new BadRequestError(error.message));
        }
    }
}