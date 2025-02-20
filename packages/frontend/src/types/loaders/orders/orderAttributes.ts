import { cartItem } from '../../cart/cartItem';

export type orderAttributes = {
  address: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  name: string;
  orderTotal: string;
  cartItems: cartItem[];
  numItemsInCart: number;
};
