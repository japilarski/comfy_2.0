import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  company: z.string(),
  description: z.string(),
  featured: z.boolean(),
  category: z.string(),
  image: z.string(),
  price: z.number(),
  shipping: z.boolean(),
  colors: z.array(z.string()),
});

export type Product = z.infer<typeof ProductSchema>;
