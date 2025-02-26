import { useSelector } from 'react-redux';
import { CartItemsList, CartTotals, SectionTitle } from '../components';
import { cartState } from '../features/cart/cartSlice';
import { userState } from '../features';
import React from 'react';

export const Cart = () => {
  const user = useSelector((state: { userState: userState }) => state.userState.user);
  const numItemsInCart = useSelector((state: { cartState: cartState }) => state.cartState.numItemsInCart);

  if (numItemsInCart === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <>
      <SectionTitle text="Shopping Cart"></SectionTitle>
      <div className="mt-8 grid gap-9 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList></CartItemsList>
        </div>
        <div className="lg:col-span-4">
          <CartTotals></CartTotals>
          {/*{user ? (*/}
          {/*  <Link to="/checkout" className="btn btn-primary brn-block mt-8">*/}
          {/*    proceed to checkout*/}
          {/*  </Link>*/}
          {/*) : (*/}
          {/*  <Link to="/login" className="btn btn-primary brn-block mt-8">*/}
          {/*    please login*/}
          {/*  </Link>*/}
          {/*)}*/}
        </div>
      </div>
    </>
  );
};
