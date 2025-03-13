import { z } from 'zod';
import { PaginationSchema } from './pagination';

export const ProductResponseMetadataSchema = z.object({
  pagination: PaginationSchema,
  categories: z.array(z.string().optional()),
  companies: z.array(z.string().optional()),
});

export type ProductResponseMetadata = z.infer<typeof ProductResponseMetadataSchema>;
