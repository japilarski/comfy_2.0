import { productsLoaderData } from './productsLoaderData';
import { productsMetadata } from './productsMetadata';
import { productsSearchParams } from './productsSearchParams';

export type productsLoaderResponse = productsLoaderData & {
  metadata: productsMetadata;
  searchParams: productsSearchParams;
};
