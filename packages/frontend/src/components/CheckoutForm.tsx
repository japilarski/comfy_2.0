import { Form, redirect } from 'react-router-dom';
import { FormInput } from './form/FormInput';
import { SubmitBtn } from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { QueryClient } from '@tanstack/react-query';
import { clearCart } from '../features';

export type customError = {
  response: { status: number; data: { error: { message: string } } };
};

export const action =
  (store: any, queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const { name, address } = Object.fromEntries(await request.formData());
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } =
      store.getState().cartState;

    const orderDetails = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      await customFetch.post(
        '/orders',
        {
          data: orderDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());

      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (error) {
      const errorMessage =
        (error as customError)?.response?.data?.error?.message ||
        'There was an error placing your order';
      toast.error(errorMessage);

      if ((error as customError).response?.status === 401 || 403) {
        return redirect('/login');
      }

      return null;
    }
  };

export const CheckoutForm = () => {
  return (
    <Form method="POST" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label="first name" name="name" type="text"></FormInput>
      <FormInput label="address" name="address" type="text"></FormInput>
      <div className="mt-4">
        <SubmitBtn text="place your order"></SubmitBtn>
      </div>
    </Form>
  );
};
