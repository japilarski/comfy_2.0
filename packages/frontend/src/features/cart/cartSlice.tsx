import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { cartItem, cartState } from '../../types';

const defaultState: cartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = (): cartState => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const itemToAdd = action.payload.product as cartItem;
      const item = state.cartItems.find(
        (i: cartItem) => i.cartId === itemToAdd.cartId
      );
      item
        ? (item.amount += itemToAdd.amount)
        : state.cartItems.push(itemToAdd);
      state.numItemsInCart += itemToAdd.amount;
      state.cartTotal += itemToAdd.amount * itemToAdd.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Item added to cart');
    },
    clearCart: () => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState; // this line sets new value of state
    },
    removeItem: (state, action) => {
      const { cartId } = action.payload;
      const itemToRemove = state.cartItems.find(
        (i: cartItem) => i.cartId === cartId
      ) as cartItem;
      if (!itemToRemove) {
        throw new Error('wrong id!');
      }
      state.cartItems = state.cartItems.filter(
        (i: cartItem) => i.cartId !== cartId
      );
      state.numItemsInCart -= itemToRemove.amount;
      state.cartTotal -= itemToRemove.amount * itemToRemove.price;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item removed from cart');
    },
    editItem: (state, action) => {
      const { cartId, amount } = action.payload;
      const itemToEdit = state.cartItems.find(
        (i: cartItem) => i.cartId === cartId
      ) as cartItem;
      if (!itemToEdit) {
        throw new Error('wrong id!');
      }
      state.numItemsInCart += amount - itemToEdit.amount;
      state.cartTotal += itemToEdit.price * (amount - itemToEdit.amount);
      itemToEdit.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success('Cart updated');
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export const cartSliceReducer = cartSlice.reducer;
