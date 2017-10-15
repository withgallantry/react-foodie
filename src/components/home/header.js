import React from 'react';

import AddressSearchBar from '../shared/address_search_bar';
import Logo from './logo';
import NavBar from './nav_bar.js';
import * as Constants from '../../util/constants';

const STYLE = {
  height: Constants.HOME_HEADER_HEIGHT,
  backgroundColor: 'rgb(245,245,245)',
  paddingTop: '40px', // temp,
};

const SEARCH_STYLE = {
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
};

const Header = ({onChange, onClick, onAddressChange, search, language, itemCount}) => {
  return (
      <div style={STYLE}>
        <Logo />
        <div style={SEARCH_STYLE}>
          <AddressSearchBar placeholder={search} onAddressChange={onAddressChange}/>
        </div>
        <NavBar
          language={language}
          itemCount={itemCount}
          onClick={onClick}
        />
      </div>
  );
};

export default Header;
