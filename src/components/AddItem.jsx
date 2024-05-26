import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/CartReducer';
import { Badge } from 'react-bootstrap';

function CartItem({ product }) {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.items.length);

  const handleAddToCart = () => {
    dispatch(addItem(product));
    window.alert(`Added ${product.name} to cart`);
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <Badge bg="secondary">{totalItems}</Badge>
    </div>
  );
}

export default CartItem;