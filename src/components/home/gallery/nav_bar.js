import React from 'react';
import * as Strings from '../../../util/localization/strings';
import { Event } from './gallery';
import ButtonNavBar from './button_nav_bar';
import SearchStore from './search_store';

const STYLE = {
  marginLeft: '7.5%',
  marginTop: '20px'
};

const SEARCH_STYLE = {
  display: 'inline',
  marginLeft: '12px'
};

const NavBar = ({onChange, onClick, searchExpanded}) => {
  return (
      <div style={STYLE}>
        <ButtonNavBar onClick={onClick} id={Event.FILTER} label={Strings.get(Strings.FILTER)} />
        <div style={SEARCH_STYLE}>
          {searchExpanded === true
            ? <SearchStore onChange={onChange}/>
            : <ButtonNavBar onClick={onClick} id={Event.SEARCH} label={Strings.get(Strings.SEARCH)} />}
        </div>
      </div>
  );
};

export default NavBar;
