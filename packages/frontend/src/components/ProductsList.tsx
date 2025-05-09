import { Link, useLoaderData } from 'react-router-dom';
import { product } from '../types';
import { formatPrice } from '../utils';

export const ProductsList = () => {
  const { products } = useLoaderData() as { products: product[] };

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex items-start sm:flex-row gap-y-4 flex-wrap bg-base-200 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <div className="card w-full shadow-xl bg-base-200 hover:shadow-2xl transition duration-300"></div>
            <figure className="px-4 pt-4 aspect-[4/3]">
              <img
                src={import.meta.env.VITE_BASE_IMG_URL + product.main_img_url}
                alt={product.name}
                className="rounded-xl h-32 w-32 sm:h-48 sm:w-48 object-cover group-hover:scale-105 duration-300"
              ></img>
            </figure>
            <div className="ml-0 sm:ml-16 flex-1">
              <h3 className="capitalize font-normal text-lg text-primary">{product.name}</h3>
              <h4 className="text-xl text-neutral-content font-bold mt-2">{product.company}</h4>
              {product.description ? <p className="mt-6 leading-8">{product.description}</p> : null}
            </div>
            {product.price ? (
              <p className="font-medium ml-0 sm:ml-auto text-lg text-primary">{formatPrice(product.price)}$</p>
            ) : null}
          </Link>
        );
      })}
    </div>
  );
};
