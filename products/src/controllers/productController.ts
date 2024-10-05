import { IProductInteractor } from "../interfaces/IProductInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@fayisorg/common-modules";




@injectable()
export class ProductController {
    private productInteractor: IProductInteractor;
    constructor(@inject(INTERFACE_TYPE.ProductInteractor) productInteractor: IProductInteractor) {
        this.productInteractor = productInteractor;
    }

    async createProduct(req: Request, res: Response, next:NextFunction){
        try {
            const { name, price, quantity, category, imageUrl, description } = req.body;
            const product = await this.productInteractor.createProduct({
                name,
                price,
                quantity,
                category,
                imageUrl,
                description
            });
            res.status(201).send(product);
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction){
        try {
            const products = await this.productInteractor.getAllProducts();
            res.send(products);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction){
        try {
            const { name, price, quantity, category, imageUrl, description } = req.body;
            const product = await this.productInteractor.updateProduct(req.params.id, {
                name,
                price,
                quantity,
                category,
                imageUrl,
                description
            });
            res.send(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction){
        try {
            await this.productInteractor.deleteProduct(req.params.id);
            res.status(204).send({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
    async getProduct(req: Request, res: Response, next: NextFunction){
        try {
            const product = await this.productInteractor.getProductById(req.params.id);
            res.send(product);
        } catch (error) {
            next(error);
        }
    }


}