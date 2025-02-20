import { logger } from '@comfy/logger';
import { ProductsService } from '../services';
import { BadRequestResource, NotFoundResource, OkResource } from '@comfy/http-resources';
import { ProductPathParamsSchema } from '../schemas/ProductPathParamsSchema';
import { ProductQueryParams, ProductQueryParamsSchema } from '../schemas/ProductQueryParamsSchema';

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  public async get(pathParams: object | null, queryParams: object | null) {
    const pathParamsParse = ProductPathParamsSchema.safeParse(pathParams);
    const queryParamsParse = ProductQueryParamsSchema.safeParse(queryParams);

    if (!pathParamsParse.success || !queryParamsParse.success) {
      const errorMessages = {
        pathError: pathParamsParse.error,
        queryError: queryParamsParse.error,
      };
      logger.error('Wrong request!', errorMessages);
      return new BadRequestResource(errorMessages).toObject();
    }

    if (!pathParamsParse.data.productId) {
      logger.info('Getting all products');
      return await this.getMany(queryParamsParse.data);
    }

    logger.info(`Getting product with productId: ${pathParamsParse.data.productId}`);
    return this.getOne(parseInt(pathParamsParse.data.productId, 10));
  }

  public async getOne(productId: number) {
    if (Number.isNaN(productId)) {
      logger.error('ProductId must be a number');
      return new BadRequestResource('ProductId must be a number!').toObject();
    }

    const product = await this.productsService.getProductById(productId);
    if (!product) {
      logger.error('Product not found');
      return new NotFoundResource().toObject();
    }

    logger.info('Returning product');
    return new OkResource(product).toObject();
  }

  public async getMany(params: ProductQueryParams) {
    const products = await this.productsService.getProducts(params);
    if (!products) {
      logger.error('Products not found');
      return new NotFoundResource().toObject();
    }

    logger.info('Getting metadata');
    const meta = await this.productsService.getMetadata(params);

    logger.info('Returning products');
    return new OkResource({ data: products, meta }).toObject();
  }
}
