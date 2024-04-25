
import React from 'react';

const Header = ({ user }) => {
  return (
    <header>
      {user ? (
        <p>Welcome, Admin {user.username}!</p>
      ) : (
        <p>Please login to view your profile</p>
      )}
    </header>
  );
};

export default Header;
