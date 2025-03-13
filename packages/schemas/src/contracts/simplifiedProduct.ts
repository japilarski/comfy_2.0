import { z } from 'zod';

export const SimplifiedProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
});

export type SimplifiedProduct = z.infer<typeof SimplifiedProductSchema>;
