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
            className="card w-full shadow-xl bg-base-300 hover:shadow-2xl transition duration-300"
          >
            <figure className="px-4 pt-4 aspect-[4/3] w-full overflow-hidden">
              <img
                src={import.meta.env.VITE_BASE_IMG_URL + product.main_img_url}
                alt={product.name}
                className="rounded-xl w-full h-full object-cover aspect-[4/3]"
              ></img>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title capitalize tracking-wide">{product.name}</h2>
              {product.price ? <span className="text-secondary">{formatPrice(product.price)}$</span> : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
