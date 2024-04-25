import React, { useState } from 'react';

const ShoppingCart = ({ cart, setCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  const handlePayment = () => {
  
    setPaymentMessage('Payment Successful!');
  };

  const handleRemoveFromCart = (productId) => {
    
    const updatedCart = cart.filter(product => product.id !== productId);
  
    setCart(updatedCart);
  };

  const filteredCart = cart.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCart.map((product) => (
          <li key={product.id}>
            <p>Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            {product.selectedSize && <p>Size: {product.selectedSize}</p>}
            <button onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
          </li>
        ))}
      </ul>
      <button onClick={handlePayment}>Proceed to Payment</button>
      {paymentMessage && <p>{paymentMessage}</p>}
    </div>
  );
};

export default ShoppingCart;
