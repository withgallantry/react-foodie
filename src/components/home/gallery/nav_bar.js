import React from 'react';
import Strings, { getString } from '../../../util/localization/strings';
import { Event } from './gallery';
import ButtonNavBar from './button_nav_bar';
import SearchStore from './search_store';

const NavBar = ({onChange, onClick, searchExpanded}) => {
  return (
      <div>
        <ButtonNavBar onClick={onClick} id={Event.FILTER} label={getString(Strings.FILTER)} />
        {searchExpanded === true
          ? <SearchStore onChange={onChange}/>
          : <ButtonNavBar onClick={onClick} id={Event.SEARCH} label={getString(Strings.SEARCH)} />}
      </div>
  );
};

export default NavBar;
