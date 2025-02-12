import { logger } from '@comfy/logger';
import { ProductsService } from '../services';
import { OkResource } from '@comfy/http-resources';

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  public async getProducts (pathParams: object | null, queryParams: object | null) {
    logger.info('pathParams: ', pathParams);
    logger.info('queryParams: ', queryParams);
    const products = await this.productsService.getProducts();
    
    return new OkResource(products).toObject();
  }
}
