import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export * from './getSingleProductResponse';
export * from './productResponseMetadata';
export * from './getProductsResponse';
export * from './simplifiedProduct';
export * from './pagination';
export * from './product';
