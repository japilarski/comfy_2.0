import React, { useEffect } from 'react';
import { ComplexPaginationContainer, Filters, ProductsContainer } from '../components';
import { productsLoaderResponse, productsSearchParams } from '../types';
import { customFetch } from '../utils';
import { QueryClient } from '@tanstack/react-query';

const url = '/products';

const allProductsQuery = (queryParams: any) => {
  const { search, category, company, order, price, shipping, page } = queryParams;
  const formatOrder = (order: string | null) => {
    if (order === 'najniższa cena') {
      return 'low';
    }
    if (order === 'najwyższa cena') {
      return 'high';
    }
    if (!order) {
      return 'a-z';
    }

    return order;
  };

  const formatSelect = (selectValue: string | null) => {
    if (!selectValue || selectValue === 'wszystkie') {
      return 'all';
    }

    return selectValue;
  };

  return {
    queryKey: [
      'products',
      search ?? '',
      formatSelect(category),
      formatSelect(company),
      formatOrder(order),
      price ?? 10_000_00,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      customFetch(url, {
        params: {
          search: search ?? '',
          category: formatSelect(category),
          company: formatSelect(company),
          order: formatOrder(order),
          price: price ?? 10_000_00,
          shipping: shipping ?? false,
          page: page ?? 1,
        },
      }),
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
