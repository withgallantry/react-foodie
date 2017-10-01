import React from 'react';
import Logo from './logo';
import SearchBarAddress from './search_bar_address';
import NavBar from './nav_bar.js';

const style = {
  height: '70px',
  backgroundColor: 'rgb(245,245,245)',
  paddingTop: '40px', // temp,
};

const Header = ({onChange, onClick, search, language, itemCount}) => {
  return (
      <div style={style}>
        <Logo />
        <SearchBarAddress onChange={onChange}/>
        <NavBar
          language={language}
          itemCount={itemCount}
          onClick={onClick}
        />
      </div>
  );
};

export default Header;
