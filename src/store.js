import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/CartReducer'

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});