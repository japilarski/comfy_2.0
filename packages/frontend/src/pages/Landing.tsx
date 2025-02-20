import { FeaturedProducts, Hero } from '../components';
import { customFetch } from '../utils';
import { landingLoaderResponse, product } from '../types';
import { QueryClient } from '@tanstack/react-query';

const productsFeaturedUrl = '/products?featured=true';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(productsFeaturedUrl),
};

export const loader =
  (queryClient: QueryClient) => async (): Promise<landingLoaderResponse> => {
    const response = await queryClient.ensureQueryData(featuredProductsQuery);
    return { products: response.data.data };
  };

export const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};
