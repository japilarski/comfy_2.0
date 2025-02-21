import { logger } from '@comfy/logger';
import { ProductsService } from '../services';
import { BadRequestResource, NotFoundResource, OkResource } from '@comfy/http-resources';
import { ProductPathParamsSchema, ProductQueryParams, ProductQueryParamsSchema } from '../schemas';
import { APIGatewayProxyResult } from 'aws-lambda';

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  public async get(pathParams: object | null, queryParams: object | null): Promise<APIGatewayProxyResult> {
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

  public async getOne(productId: number): Promise<APIGatewayProxyResult> {
    if (Number.isNaN(productId)) {
      logger.error('ProductId must be a number');
      return new BadRequestResource('ProductId must be a number!').toObject();
    }

    const product = await this.productsService.getProductById(productId);
    logger.debug('Product:', { product });
    if (!product) {
      logger.error('Product not found');
      return new NotFoundResource().toObject();
    }

    logger.info('Returning product');
    return new OkResource({ data: product }).toObject();
  }

  public async getMany(params: ProductQueryParams): Promise<APIGatewayProxyResult> {
    const products = await this.productsService.getProducts(params);
    // if (products.length === 0) { // TODO: does frontend understand that?
    //   logger.error('Products not found');
    //   return new NotFoundResource().toObject();
    // }
    logger.debug('Products:', { products });

    logger.info('Getting metadata');
    const meta = await this.productsService.getMetadata(params);

    logger.info('Returning products');
    return new OkResource({ data: products, meta }).toObject();
  }
}
