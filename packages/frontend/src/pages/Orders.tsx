import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { customError } from '../components/CheckoutForm';
import { ordersLoaderResponse } from '../types';
import {
  ComplexPaginationContainer,
  OrdersList,
  SectionTitle,
} from '../components';
import { QueryClient } from '@tanstack/react-query';
import { user } from '../features/user/userSlice';

const ordersQuery = (queryParams: any, user: user) => ({
  queryKey: [
    'orders',
    user.id,
    queryParams.page ? parseInt(queryParams.page) : 1,
  ],
  queryFn: () =>
    customFetch.get('/orders', {
      params: queryParams,
      headers: { Authorization: `Bearer ${user.token}` },
    }),
});

export const loader =
  (store: any, queryClient: QueryClient) =>
  async ({
    request,
  }: {
    request: Request;
  }): Promise<ordersLoaderResponse | null | Response> => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must be logged in to view orders');
      return redirect('/login');
    }

    const searchParams = Object.fromEntries(
      ...[new URL(request.url).searchParams.entries()]
    );

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(searchParams, user)
      );
      console.log(response);
      return {
        orders: response.data.data,
        metadata: response.data.meta,
        searchParams,
      };
    } catch (error) {
      const errorMessage =
        (error as customError)?.response?.data?.error?.message ||
        'There was an error getting your orders';
      toast.error(errorMessage);

      if ((error as customError)?.response?.status === 401 || 403) {
        return redirect('/login');
      }
      return null;
    }
  };

export const Orders = () => {
  const { metadata } = useLoaderData() as ordersLoaderResponse;

  if (metadata.pagination.total < 1) {
    return <SectionTitle text="please make an order"></SectionTitle>;
  }

  return (
    <>
      <SectionTitle text="your orders"></SectionTitle>
      <OrdersList></OrdersList>
      <ComplexPaginationContainer></ComplexPaginationContainer>
    </>
  );
};
