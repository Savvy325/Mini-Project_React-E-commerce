import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/CartReducer';

function ProductList() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div>
      <h2>Products</h2>
      <ul className="list-unstyled">
        {products.map((product) => (
          <li key={product.id} className="mb-5">
            <Link to={`/products/${product.id}`} className="text-decoration-none">
              <div className="text-center">
                <h4>{product.title}</h4>
                <img src={product.image} alt={product.title} className="img-fluid" style={{ maxWidth: '100px' }} />
              </div>
            </Link>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)} className="btn btn-primary">Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;