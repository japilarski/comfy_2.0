import { Form, useLoaderData, Link } from 'react-router-dom';
import { FormInput } from './FormInput';
import { FormSelect } from './FormSelect';
import { productsLoaderResponse } from '../../types';
import { FormRange } from './FormRange';
import { FormCheckbox } from './FormCheckbox';
export const Filters = () => {
  const { metadata, searchParams } = useLoaderData() as productsLoaderResponse;

  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={searchParams.search}
      ></FormInput>
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        listToDisplay={metadata.categories}
        size="select-sm"
        defaultValue={searchParams.category}
      ></FormSelect>
      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        listToDisplay={metadata.companies}
        size="select-sm"
        defaultValue={searchParams.company}
      ></FormSelect>
      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        listToDisplay={['a-z', 'z-a', 'high', 'low']}
        size="select-sm"
        defaultValue={searchParams.order}
      ></FormSelect>
      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        defaultValue={searchParams.price}
      ></FormRange>
      {/* SHIPPING */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultValue={searchParams.shipping}
      ></FormCheckbox>
      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        reset
      </Link>
    </Form>
  );
};
