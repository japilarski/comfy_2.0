import { z } from 'zod';
import { ProductResponseMetadataSchema } from './productResponseMetadata';
import { SimplifiedProductSchema } from './simplifiedProduct';

export const GetProductsResponseSchema = z.object({
  metadata: ProductResponseMetadataSchema,
  data: z.array(SimplifiedProductSchema),
});

export type GetProductsResponse = z.infer<typeof GetProductsResponseSchema>;
