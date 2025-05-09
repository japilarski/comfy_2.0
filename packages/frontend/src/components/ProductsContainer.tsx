import { ProductsGrid } from './ProductsGrid';
import { ProductsList } from './ProductsList';
import { useLoaderData } from 'react-router-dom';
import React, { useState } from 'react';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import { productsLoaderResponse } from '../types';

export const ProductsContainer = () => {
  const { metadata } = useLoaderData() as productsLoaderResponse;

  const [layout, setLayout] = useState('grid');

  const getActiveStyle = (pattern: string) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout ? 'btn-primary text-primary-content' : 'btn-ghost text-based-content'
    }`;
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {metadata.pagination.total} produkt
          {metadata.pagination.total > 1 && 'ów'}
        </h4>
        <div className="flex gap-x-2">
          <button type="button" onClick={() => setLayout('grid')} className={getActiveStyle('grid')}>
            <BsFillGridFill></BsFillGridFill>
          </button>
          <button type="button" onClick={() => setLayout('list')} className={getActiveStyle('list')}>
            <BsList></BsList>
          </button>
        </div>
      </div>
      {/* PRODUCTS */}
      <div>
        {metadata.pagination.total === 0 ? (
          <h5 className="text-2xl mt-16">Sorry, no products matches your search...</h5>
        ) : layout === 'grid' ? (
          <ProductsGrid></ProductsGrid>
        ) : (
          <ProductsList></ProductsList>
        )}
      </div>
    </>
  );
};
