import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Error fetching categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = (category) => {
    if (category === selectedCategory) {
      setSelectedCategory('');
      setFilteredProducts(products);
    } else {
      setSelectedCategory(category);
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h1 className="logo">Product Filter App</h1>
        {isLoggedIn ? (
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        ) : (
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </nav>

      <div className="category-filter">
        <button
          className={selectedCategory === '' ? 'selected' : ''}
          onClick={() => filterProducts('')}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'selected' : ''}
            onClick={() => filterProducts(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id} onClick={() => handleProductClick(product)}>
            <div
              className="product-image"
              style={{ backgroundImage: `url(${product.image})` }}
            />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">$ {product.price}</p>
              {selectedProduct && selectedProduct.id === product.id && (
                <p className="product-description">{product.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
