import { Link, useLoaderData } from 'react-router-dom';
import { product } from '../types';
import { formatPrice } from '../utils';

export const ProductsGrid = () => {
  const { products } = useLoaderData() as { products: product[] };
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const attributes = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl bg-base-200 hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img
                src={attributes.image}
                alt={attributes.title}
                className="rounded-xl h-64 md:h-48 w-full object-cover"
              ></img>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wide">
                {attributes.title}
              </h2>
              <span className="text-secondary">
                {formatPrice(attributes.price)}$
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
