import { z } from 'zod';

export const ProductSchema = z.object({ // TODO: optional or nullable?
  id: z.string(),
  name: z.string(),
  collection: z.string().optional(),
  company: z.string(),
  category: z.string(),
  description: z.string().optional(),
  manual_url: z.string(),
  main_img_url: z.string(),
  img_urls: z.array(z.string()),
  featured: z.boolean(),
  price: z.number(),
});

export type Product = z.infer<typeof ProductSchema>;
