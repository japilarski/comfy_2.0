import { configureStore } from '@reduxjs/toolkit';
import { cartSliceReducer, userSliceReducer } from './features';

export const store = configureStore({
  reducer: {
    cartState: cartSliceReducer,
    userState: userSliceReducer,
  },
});
