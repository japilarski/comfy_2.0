import { cartItem } from "./cartItem";

export type cartState = {
  cartItems: cartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};
