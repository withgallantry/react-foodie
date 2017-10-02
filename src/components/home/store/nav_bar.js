import React from 'react';
import Strings, { getString } from '../../../util/localization/strings';
import { Event } from './gallery';
import ButtonNavBar from './button_nav_bar';
import SearchStore from './search_store';

const style = {
  marginLeft: '7.5%',
  marginTop: '20px'
};

const searchStyle = {
  display: 'inline',
  marginLeft: '12px'
};

const NavBar = ({onChange, onClick, searchExpanded}) => {
  return (
      <div style={style}>
        <ButtonNavBar onClick={onClick} id={Event.FILTER} label={getString(Strings.FILTER)} />
        <div style={searchStyle}>
          {searchExpanded === true
            ? <SearchStore onChange={onChange}/>
            : <ButtonNavBar onClick={onClick} id={Event.SEARCH} label={getString(Strings.SEARCH)} />}
        </div>
      </div>
  );
};

export default NavBar;
