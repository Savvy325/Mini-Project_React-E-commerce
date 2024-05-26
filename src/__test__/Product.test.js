import React from 'react';
import axios from 'axios';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';
import ProductList from '../components/ProductList';

jest.mock('axios');

describe('ProductList Component', () => {
  test('fetches product data from API and renders products', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', description: 'Description 1', price: 10, image: 'product1.jpg' },
      { id: 2, title: 'Product 2', description: 'Description 2', price: 20, image: 'product2.jpg' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockProducts });

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://fakestoreapi.com/products');
      expect(getByText('Product 1')).toBeInTheDocument();
      expect(getByText('Product 2')).toBeInTheDocument();
      expect(getByAltText('Product 1')).toBeInTheDocument();
      expect(getByAltText('Product 2')).toBeInTheDocument();
    });
  });

  test('adds product to cart when "Add to Cart" button is clicked', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', description: 'Description 1', price: 10, image: 'product1.jpg' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockProducts });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const addToCartButton = getByText('Add to Cart');
      fireEvent.click(addToCartButton);
      expect(store.getState().cart.items.length).toBe(1);
    });
  });
});