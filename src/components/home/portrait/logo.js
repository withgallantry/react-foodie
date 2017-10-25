import React from 'react';
import { Link } from 'react-router-dom';

const h3 = {
  fontSize: '32pt',
};

const Logo = () => {
  return (
    <div style={{ textAlign : 'center' }}>
      <Link to='/'>
        <h3 style={h3}>
          &copy; Foodie
        </h3>
      </Link>
    </div>
  );
};

export default Logo;
