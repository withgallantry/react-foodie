import React from 'react';
import Logo from './logo';
import SearchBarAddress from './search_bar_address';

const style = {
  height: '70px',
  backgroundColor: 'rgb(245,245,245)',
};

const Header = ({onClick, search}) => {
  return (
      <div style={style}>
        <ul>
          <Logo />
          <SearchBarAddress
            onClick={onClick}
            placeholder={search}
          />
        </ul>
      </div>
  );
};

export default Header;
