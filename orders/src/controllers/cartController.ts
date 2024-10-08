import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { ICartInteractor } from "../interfaces/ICartInteractor";
import { Request, Response, NextFunction } from "express";




@injectable()
export class CartController {
    private cartInteractor: ICartInteractor;
    constructor(@inject(INTERFACE_TYPE.CartInteractor)cartInteractor: ICartInteractor) {
        this.cartInteractor = cartInteractor;
    }

    /**
     * Handles the creation of a new shopping cart.
     *
     * @param req - The Express request object containing the cart item and user information.
     * @param res - The Express response object to send the created cart.
     * @param next - The Express next function to handle any errors.
     *
     * @remarks
     * The function extracts the cart item and user ID from the request body and calls the `createCart` method of the `cartInteractor`.
     * If the cart is successfully created, it sends a 201 status code along with the created cart.
     * If an error occurs during the process, it calls the `next` function with the error.
     */
    async createCart(req: Request, res: Response, next: NextFunction) {
        const { item } = req.body;
        try {
            const userId = req.currentUser!.id;
            const cart = await this.cartInteractor.createCart(item, userId);
            res.status(201).send(cart);
        } catch (error) {
            next(error);
        }
    }

    async getCartByUserId(req: Request, res: Response, next: NextFunction) {
        const userId = req.currentUser!.id;
        try {
            const cart = await this.cartInteractor.findCartByUserId(userId);
            if (!cart) {
                res.status(404).send({message: 'Cart not found.'});
            }
            res.send(cart);
        } catch (error) {
            next(error);
        }
    }

    async getCartById(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        try {
            const cart = await this.cartInteractor.findCartById(id);
            if (!cart) {
                res.status(404).send({message: 'Cart not found.'});
            }
            res.send(cart);
        } catch (error) {
            next(error);
        }
    }

    async updateCartStatus(req: Request, res: Response, next: NextFunction) {
        const { status } = req.body;
        const id = req.params.id;
        try {
            const cart = await this.cartInteractor.updateCartStatus(id,status);
            if (!cart) {
                res.status(404).send({message: 'Cart not found.'});
            }
            res.send(cart);
        } catch (error) {
            next(error);
        }
    }
}