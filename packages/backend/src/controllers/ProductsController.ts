import { logger } from '@comfy/logger';
import { ProductsService } from '../services';
import {
  BadRequestResource,
  NotFoundResource,
  OkResource,
} from '@comfy/http-resources';
import { ProductPathParamsSchema } from '../schemas/ProductPathParamsSchema';

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  public async getProducts(
    pathParams: object | null,
    queryParams: object | null
  ) {
    const pathParamsParseResult = ProductPathParamsSchema.safeParse(pathParams);

    if (!pathParamsParseResult.success) {
      return new BadRequestResource().toObject();
    }

    if (!pathParamsParseResult.data.productId) {
      const products = await this.productsService.getProducts();

      if (!products) {
        return new NotFoundResource().toObject();
      }

      return new OkResource(products).toObject();
    }

    const product = await this.productsService.getProductById(
      parseInt(pathParamsParseResult.data.productId, 10)
    );

    if (!product) {
      return new NotFoundResource().toObject();
    }

    return new OkResource(product).toObject();
  }
}
