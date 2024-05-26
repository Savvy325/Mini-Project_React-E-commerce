import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/CartReducer';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/1');
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
    }
  };

  return (
    <div>
      {product ? (
        <div>
          <img src={product.image} alt={product.title} style={{ width: '200px', height: '200px' }} />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;