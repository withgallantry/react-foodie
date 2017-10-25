import React from 'react';

import AddressSearchBar from '../../shared/address_search_bar';
import Logo from './logo';
import NavBar from './nav_bar.js';
import * as Constants from '../../../misc/constants';

const div = {
  height: Constants.HOME_HEADER_HEIGHT_LANDSCAPE,
  backgroundColor: 'rgb(245,245,245)',
  paddingTop: '40px',
};

const divSearch = {
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
};

const Header = ({onChange, onClick, onAddressChange, search, language, storeId}) => {
  return (
      <div style={div}>
        <Logo />
        <div style={divSearch}>
          <AddressSearchBar placeholder={search} onAddressChange={onAddressChange}/>
        </div>
        <NavBar
          language={language}
          storeId={storeId}
          onClick={onClick}
        />
      </div>
  );
};

export default Header;
