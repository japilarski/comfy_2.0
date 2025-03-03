import { z } from 'zod';

export const ProductPathParamsSchema = z
  .object({
    productId: z.string(),
  })
  .nullable();

export type ProductPathParams = z.infer<typeof ProductPathParamsSchema>;
