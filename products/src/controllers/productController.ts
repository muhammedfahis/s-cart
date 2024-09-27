import { IProductInteractor } from "../interfaces/IProductInteractor";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPE } from "../utils/appCont";


@injectable()
export class ProductController {
    private productInteractor: IProductInteractor;
    constructor(@inject(INTERFACE_TYPE.ProductInteractor) productInteractor: IProductInteractor) {
        this.productInteractor = productInteractor;
    }

}