import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'


function Home() {
  return (
    <div>
      <h1>Welcome to the Product Catalog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/categories">Browse Categories</Link>
          </li>
          <li>
            <Link to="/search">Search Products</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;