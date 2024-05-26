import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, clearCart } from '../reducers/cartReducer';

function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch(clearCart());
      JSON.parse(savedCart).forEach(item => dispatch(addItem(item)));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


}

export default ShoppingCart;