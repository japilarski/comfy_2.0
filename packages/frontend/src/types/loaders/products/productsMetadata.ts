import { pagination } from '../..';

export type productsMetadata = pagination & {
  categories: string[];
  companies: string[];
};
