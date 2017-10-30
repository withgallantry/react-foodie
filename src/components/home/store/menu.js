import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SubMenu from './sub_menu';
import * as Constants from '../../../misc/constants';
import * as Event from './event';

const div = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  marginRight: Constants.HOME_STORE_MARGIN_LEFT,
};

const ul = {
  margin: 0,
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  padding: 0,
  fontSize: '12pt',
  textAlign: 'center',
};

const li = {
  marginRight: '10px',
};

const hr = {
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
        style={li}
        key={`item${i}`}
        onClick={() => onClick(Event.SCROLL_TO_MENU, [i])}>
        {item.name.toUpperCase()}
      </li>
    ));
    if ((i + 1) < items.length) {
      navBarItems.push((
        <li style={li} key={`dot${i}`}>•</li>
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
      <div style={div}>
        <ul style={ul}>
          {navBarItems}
        </ul>
      </div>
      <hr style={hr}/>
      {menuItems}
    </div>
  );
};

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

export default Menu;
