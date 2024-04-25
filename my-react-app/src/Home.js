import React, { useState, useEffect } from 'react';

const Home = ({ isAdmin }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://list.ly/api/v4/meta?url=http://google.com');
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      <h2>Welcome to the Football Online Store</h2>
      <p>Explore our latest collection of football shirts and merchandise. Find your favorite team's jersey and show your support!</p>
      <p>Don't miss out on the best deals. Shop now and gear up for the next football season!</p>
      <p>We have shirts of your favourite teams of this season and the 2022/23 season. We hope you will like it and enjoy it!!</p>
      <p>Don't forget to share our shop with your family and friends.</p>
      <p>Remember that every 5 times you buy something in our shop, you will have a 15% discount coupon</p>
      <p>To see the products, please go to the next page named Products</p>
      <p>When you click on a product, go to the Shopping Cart, and there will appear your product with the total price to pay.</p>


      {isAdmin && (
        <div>
          <h3>Admin Section</h3>
          <p>As an administrator, you have access to special features:</p>
          <ul>
            <li>Add, remove, and update products in the store.</li>
            <li>View and manage user orders.</li>
          </ul>
        </div>
      )}

    
    </div>
  );
};

export default Home;