import React from 'react';

import ButtonNavBar from './button_nav_bar';
import SearchStore from './search_store';
import * as Constants from '../../../util/constants';
import * as Event from './event';
import * as Strings from '../../../util/localization/strings';

const STYLE = {
  marginLeft: Constants.HOME_MARGIN_LEFT,
  marginTop: Constants.HOME_MARGIN_TOP,
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
