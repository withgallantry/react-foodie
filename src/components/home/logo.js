import React from 'react';
import { Link } from 'react-router-dom';

const STYLE = {
  position: 'absolute',
  left: '40px',
  top: '40px',
  zIndex: 1000,
};

const Logo = () => {
  return (
    <Link to='/'>
      <h3 style={STYLE}>
        &copy; Foodie
      </h3>
    </Link>
  );
};

export default Logo;
