import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';
import UserContext from './context/UserContext';
import Home from './components/Home';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Categories from './components/Categories'
import ShoppingCart from './components/ShoppingCart'
import Search from './components/Search'
import NavBar from './components/NavBar';
import store from './store'


function App() {
  const queryClient = new QueryClient();

  const [user, setUser] = useState(() => {
    let currentUser = sessionStorage.getItem('user');
    return currentUser ? JSON.parse(currentUser) : { name: '', isLoggedIn: false };
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <UserContext.Provider value={{ user, setUser }}>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/1" element={<ProductDetails />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
