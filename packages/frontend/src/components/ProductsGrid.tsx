import { Link, useLoaderData } from 'react-router-dom';
import { product } from '../types';
import { formatPrice } from '../utils';
import React from 'react';

export const ProductsGrid = () => {
  const { products } = useLoaderData() as { products: product[] };
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-xl bg-base-200 hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4">
              <img src={product.image} alt={product.name} className="rounded-xl h-64 md:h-48 w-full object-cover"></img>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wide">{product.name}</h2>
              <span className="text-secondary">{formatPrice(product.price)}$</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
