import { pagination } from '../../pagination';
import { ordersLoaderData } from './ordersLoaderData';

export type ordersLoaderResponse = ordersLoaderData & {
  metadata: pagination;
  searchParams: {};
};
