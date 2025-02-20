import { Link, useLoaderData } from 'react-router-dom';
import { product } from '../types';
import { formatPrice } from '../utils';

export const ProductsList = () => {
  const { products } = useLoaderData() as { products: product[] };

  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const attributes = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex items-start sm:flex-row gap-y-4 flex-wrap bg-base-200 shadow-xl hover:shadow-2xl duration-300 group"
          >
            <figure className="px-1 pt-1">
              <img
                src={attributes.image}
                alt={attributes.title}
                className="rounded-xl h-32 w-32 sm:h-48 sm:w-48 object-cover group-hover:scale-105 duration-300"
              ></img>
            </figure>
            <div className="ml-0 sm:ml-16 flex-1">
              <h3 className="capitalize font-medium text-lg text-primary">
                {attributes.title}
              </h3>
              <h4 className="capitalize font-medium text-md">
                {attributes.company}
              </h4>
              <p className="font-small ml-0 sm:ml-auto text-sm text-justify pr-4">
                {attributes.description}
              </p>
            </div>
            <p className="font-medium ml-0 sm:ml-auto text-lg text-primary">
              {formatPrice(attributes.price)}$
            </p>
          </Link>
        );
      })}
    </div>
  );
};
