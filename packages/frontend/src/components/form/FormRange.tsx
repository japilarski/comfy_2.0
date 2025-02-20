import { useState } from 'react';
import { formatPrice } from '../../utils';
import { useLoaderData } from 'react-router-dom';
import { product, productsLoaderResponse } from '../../types';
import { ChangeEvent } from 'react';

export type FormRangeProps = {
  label: string;
  name: string;
  size?: string;
  defaultValue?: string;
};

// const getMaxPrice = (products: product[]): number => {
//   return products.reduce((maxPrice, product) => {
//     const price = parseFloat(product.price);
//     return price > maxPrice ? price : maxPrice;
//   }, 0);
// };

export const FormRange = (props: FormRangeProps) => {
  // const { products } = useLoaderData() as productsLoaderResponse;
  const maxPrice = 100_000_000;
  const step = 100;
  const [selectedPrice, setSelectedPrice] = useState(
    props.defaultValue ? parseInt(props.defaultValue) : maxPrice
  );

  return (
    <div>
      <label htmlFor={props.name} className="label cursor-pointer">
        <span className="label-text capitalize">{props.label}</span>
        <span>${formatPrice(selectedPrice)}</span>
      </label>
      <input
        type="range"
        name={props.name}
        min={0}
        max={maxPrice}
        step={step}
        value={selectedPrice}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedPrice(parseInt(e.target.value))}
        className={`range range-primary ${props.size}`}
      ></input>
      {/* 
        <div className="w-full flex justify-between text-xs px-2 mt-2">
          <span className="font-bold text-md">$0</span>
          <span className="font-bold text-md">${formatPrice(maxPrice)}</span>
        </div> 
      */}
    </div>
  );
};
