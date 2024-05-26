import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateItemQuantity, clearCart } from '../features/CartReducer';
import { Button, Table } from 'react-bootstrap';

function ShoppingCart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let itemsCount = 0;
    let itemsPrice = 0;
    cartItems.forEach(item => {
      itemsCount += item.quantity;
      itemsPrice += item.price * item.quantity;
    });
    setTotalItems(itemsCount);
    setTotalPrice(itemsPrice);
  }, [cartItems]);

  const handleRemoveItem = (id) => {
    dispatch(removeItem({id}));
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    localStorage.removeItem('cart');
    alert('Checkout successful. Your cart has been cleared.');
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>Remove</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <Button variant="primary" onClick={handleCheckout}>Checkout</Button>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;