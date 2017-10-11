import React from 'react';
import Logo from './logo';
import SearchAddress from './search_address';
import NavBar from './nav_bar.js';

const STYLE = {
  height: '70px',
  backgroundColor: 'rgb(245,245,245)',
  paddingTop: '40px', // temp,
};

const Header = ({onChange, onClick, search, language, itemCount}) => {
  return (
      <div style={STYLE}>
        <Logo />
        <SearchAddress onChange={onChange}/>
        <NavBar
          language={language}
          itemCount={itemCount}
          onClick={onClick}
        />
      </div>
  );
};

export default Header;
