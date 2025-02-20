import { useSelector } from 'react-redux';
import { CartTotals, CheckoutForm, SectionTitle } from '../components';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { cartState } from '../types';

export const loader = (state: any) => () => {
  const user = state.getState().userState.user;
  if (!user) {
    toast.warn('You must be login to checkout');
    return redirect('/login');
  }
  return null;
};

export const Checkout = () => {
  const cartTotal = useSelector(
    (state: { cartState: cartState }) => state.cartState.cartTotal
  );
  if (cartTotal === 0) {
    return <SectionTitle text="your cart is empty"></SectionTitle>;
  }

  return (
    <>
      <SectionTitle text="place your order"></SectionTitle>
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm></CheckoutForm>
        <CartTotals></CartTotals>
      </div>
    </>
  );
};
