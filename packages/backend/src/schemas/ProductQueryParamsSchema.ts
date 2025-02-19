import { z } from 'zod';

export const ProductQueryParamsSchema = z.object({
  category: z.string().optional(),
  shipping: z.string().optional(),
  featured: z.string().optional(),
  company: z.string().optional(),
  search: z.string().optional(),
  price: z.string().optional(),
  page: z.string().optional(),
  order: z.enum(['a-z', 'z-a', 'low', 'high', '']).optional(),
});

export type ProductQueryParams = z.infer<typeof ProductQueryParamsSchema>;
