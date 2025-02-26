import { customFetch, formatPrice } from '../utils';
import { cartItem, singleProductResponse } from '../types';
import { Link, useLoaderData } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features';
import { generateAmountOptions } from '../utils/generateAmountOptions';
import { QueryClient } from '@tanstack/react-query';

const singleProductQuery = (id: number) => ({
  queryKey: ['singleProduct', id],
  queryFn: () => customFetch(`/products/${id}`),
});

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: any): Promise<singleProductResponse> => {
    const response = await queryClient.ensureQueryData(singleProductQuery(params.id));
    return { product: response.data.data };
  };

export const SingleProduct = () => {
  const { product } = useLoaderData() as singleProductResponse;
  const [productColor, setProductColor] = useState(product.colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const cartProduct: cartItem = {
    cartId: product.id + productColor,
    productId: product.id,
    image: product.image,
    title: product.name,
    price: product.price,
    company: product.company,
    productColor,
    amount,
  };

  const addToCart = () => {
    // TODO: popup with question if you want to go to cart or continue shopping
    dispatch(addItem({ product: cartProduct }));
  };

  const dispatch = useDispatch();

  return (
    <section>
      {/* BREADCRUMBS */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img src={product.image} alt={product.name} className="w-96 h-96 object-cover rounded-lg lg:w-full"></img>
        {/* DESCRIPTION */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{product.name}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">{product.company}</h4>
          <p className="mt-3 text-xl">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-8">{product.description}</p>
          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">colors</h4>
            <div className="mt-2 flex items-center">
              {product.colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-8 h-8 mr-2 ${color == productColor && 'border-4 border-neutral'}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* AMOUNT */}
          <div className="form-control w-full max-w-xs">
            <label htmlFor="amount" className="">
              <h4 className="text-md font-medium -tracking-wider capitalize">amount</h4>
            </label>
            <select id="amount" className="select select-secondary select-bordered select-md" onChange={handleAmount}>
              {generateAmountOptions(amount + 5)}
            </select>
          </div>
          {/* CART BUTTON */}
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
