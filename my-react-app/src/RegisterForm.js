import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; 

const RegisterPage = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

 
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      if (formData.password !== formData.confirmPassword) {
        setMessage('The passwords does not match.');
        return;
      }

   
      console.log('Register sent:');
      console.log(formData);

      
      setMessage('Account created with success!! Click on this button to move to the Log In page...');
    } catch (error) {
     
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
      <h1>Create an Account</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Account</button>
        {message && (
          <p>
            {message}{' '}
            <Link to="/login">Login Form</Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;

