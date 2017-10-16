import React from 'react';
import _ from 'lodash';

import * as Constants from '../../../util/constants';
import * as Event from './event';

const STYLE = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT
};

const UL_STYLE = {
  margin: 0,
  marginBottom: '20px',
  marginTop: '20px',
  padding: 0,
};

const LI_STYLE = {
  marginRight: '20px',
};

const Menu = ({items, onClick}) => {
  let listItems = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    listItems.push((
      <li
        className='menu-item'
        style={LI_STYLE}
        key={`item${i}`}
        onClick={() => onClick(Event.GO_TO_MENU_ITEM, i)}>
        {item.name}
      </li>
    ));
  }
  return (
    <div style={STYLE}>
      <ul style={UL_STYLE}>
        {listItems}
      </ul>
    </div>
  );
};

export default Menu;
