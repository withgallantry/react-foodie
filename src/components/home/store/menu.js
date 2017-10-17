import React from 'react';
import _ from 'lodash';

import SubMenu from './sub_menu';
import * as Constants from '../../../util/constants';
import * as Event from './event';

const STYLE = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT
};

const UL_STYLE = {
  margin: 0,
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  padding: 0,
};

const LI_STYLE = {
  marginRight: '10px',
};

const HR_STYLE = {
  margin: 0,
  padding: 0
};

const Menu = ({items, onClick}) => {
  let navBarItems = [];
  let menuItems = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    navBarItems.push((
      <li
        className='menu-item'
        style={LI_STYLE}
        key={`item${i}`}
        onClick={() => onClick(Event.GO_TO_MENU, [i])}>
        {item.name.toUpperCase()}
      </li>
    ));
    if ((i + 1) < items.length) {
      navBarItems.push((
        <li style={LI_STYLE} key={`dot${i}`}>•</li>
      ));
    }
    menuItems.push((
      <SubMenu
        key={`subMenu${i}`}
        onClick={onClick}
        item={item}
        index={i}
      />
    ));
  }
  return (
    <div>
      <div style={STYLE}>
        <ul style={UL_STYLE}>
          {navBarItems}
        </ul>
      </div>
      <hr style={HR_STYLE}/>
      {menuItems}
    </div>
  );
};

export default Menu;
