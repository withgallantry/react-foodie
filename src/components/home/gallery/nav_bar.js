import React from 'react';
import ButtonFilter from './button_filter';
import ButtonSearch from './button_search';

const NavBar = ({onClick}) => {
  return (
      <div>
        <ButtonFilter onClick={onClick} />
        <ButtonSearch onClick={onClick} />
      </div>
  );
};

export default NavBar;
