import { z } from 'zod';

export const ProductPathParamsSchema = z.object({
  productId: z.string().optional(),
});
