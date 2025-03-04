import React, { useEffect } from 'react';
import { ComplexPaginationContainer, Filters, ProductsContainer } from '../components';
import { productsLoaderResponse, productsSearchParams } from '../types';
import { customFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';

const url = '/products';

const allProductsQuery = (queryParams: any) => {
  const { search, category, company, order, price, shipping, page } = queryParams;

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      order ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: queryParams }),
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async (props: any): Promise<productsLoaderResponse> => {
    const searchParams = Object.fromEntries([
      ...new URL(props.request.url).searchParams.entries(),
    ]) as productsSearchParams;
    const response = await queryClient.ensureQueryData(allProductsQuery(searchParams));
    return {
      products: response.data.data,
      metadata: response.data.meta,
      searchParams, // TODO: change to queryParams
    };
  };

export const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Filters></Filters>
      <ProductsContainer></ProductsContainer>
      <ComplexPaginationContainer></ComplexPaginationContainer>
    </>
  );
};
