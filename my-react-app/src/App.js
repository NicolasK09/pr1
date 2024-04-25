import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { fetchUsers } from './Api.js';
import Home from './Home.js';
import ProductsList from './ProductList.js';
import ShoppingCart from './ShoppingCart.js';
import RegisterForm from './RegisterForm.js';
import LoginForm from './LoginForm.js';
import Header from './Header.js';
import './App.css';

const App = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    dateOfBirth: '',
    gender: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    username: '', 
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
 
    if (!isLoggedIn) {
      
      return; 
    }

    setCart([...cart, product]);
    setTotalPrice(totalPrice + product.price);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Registering user:', registerData);
    setRegisterData({
      username: '',
      email: '',
      password: '',
      dateOfBirth: '',
      gender: '',
    });

    setIsLoggedIn(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in user:', loginData);
    setLoginData({
      email: '',
      username: '', 
      password: '',
    });

    const user = {
      username: loginData.username,
      email: loginData.email,
    };

    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCart([]); 
  };

  const handlePayment = () => {
    setPaymentStatus(true);
  };

  const navigateToLogin = () => {
    window.location.href = '/login'; 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await fetchUsers();
        console.log('Users: ', users);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
      try {
        const users = await fetchUsers();
        console.log('API: https://world.openfoodfacts.org/api/v0/product/737628064502');
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Header user={currentUser} />

        <header>
          <h1>Football Online Store</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
              {isLoggedIn ? (
                <>
                  <li>Logged in as: {currentUser && currentUser.username}</li>
                  <li onClick={handleLogout}>Logout</li>
                </>
              ) : (
                <>
                  <li><Link to="/register">Create an Account</Link></li>
                  <li onClick={navigateToLogin}>Log In</li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList searchTerm={searchTerm} setSearchTerm={setSearchTerm} addToCart={addToCart} isLoggedIn={isLoggedIn} navigateToLogin={navigateToLogin} />} />
          <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} total={paymentStatus ? `Total Amount: $${totalPrice}` : ''} handlePayment={handlePayment} />} />
          <Route path="/register" element={<RegisterForm registerData={registerData} setRegisterData={setRegisterData} handleRegisterSubmit={handleRegisterSubmit} />} />
          <Route path="/login" element={<LoginForm loginData={loginData} setLoginData={setLoginData} handleLoginSubmit={handleLoginSubmit} navigateToLogin={navigateToLogin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;