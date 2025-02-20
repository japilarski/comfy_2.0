import { useSelector } from 'react-redux';
import { CartItem } from './CartItem';
import { cartState } from '../../features/cart/cartSlice';

export const CartItemsList = () => {
  const cartItems = useSelector(
    (state: { cartState: cartState }) => state.cartState.cartItems
  );

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.cartId} cartItem={item}></CartItem>;
      })}
    </>
  );
};
