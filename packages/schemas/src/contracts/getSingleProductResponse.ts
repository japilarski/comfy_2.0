import { z } from 'zod';
import { ProductSchema } from './product';
import { ProductResponseMetadataSchema } from './productResponseMetadata';

export const GetSingleProductResponseSchema = z.object({
  data: ProductSchema,
  metadata: ProductResponseMetadataSchema,
});