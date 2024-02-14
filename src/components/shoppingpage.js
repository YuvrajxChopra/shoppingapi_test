import React, { useState, useEffect } from 'react';
import './styles/shoppingpage.css';

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[product.id] = (updatedCart[product.id] || 0) + 1;
      return updatedCart;
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[productId] = quantity;
      return updatedCart;
    });
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">Shoplane</div>
        <div className="navbar-links">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Contact</a>
        </div>
      </nav>
      <div className="shopping-page-container">
        <h2>Shoplane - Your Online Shopping Destination</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>${product.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleQuantityChange(product.id, (cart[product.id] || 0) - 1)}
                    disabled={(cart[product.id] || 0) <= 0}
                  >
                    -
                  </button>
                  <span>{cart[product.id] || 0}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, (cart[product.id] || 0) + 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingPage;
