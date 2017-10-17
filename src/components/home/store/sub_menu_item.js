import React from 'react';

import * as Constants from '../../../util/constants';
import * as Event from './event';

const STYLE = {
  paddingLeft: Constants.HOME_STORE_MARGIN_LEFT,
  marginTop: Constants.HOME_STORE_ITEM_MARGIN_VERTICAL,
  marginBottom: Constants.HOME_STORE_ITEM_MARGIN_VERTICAL,
};

const PRICE_STYLE = {
  display: 'inline',
  float: 'right',
  marginRight: Constants.HOME_STORE_MARGIN_LEFT,
};

const DESC_STYLE = {
  display: 'inline',
};

const SubMenuItem = ({onClick, item, index, menu}) => {
  return (
    <div
      className='sub-menu-item'
      style={STYLE}
      onClick={() => onClick(Event.ADD_ITEM, [menu, index])}>
      <p>{item.name}</p>
      <span style={DESC_STYLE}>• &nbsp; {item.desc}</span>
      <span style={PRICE_STYLE}>{item.price}</span>
    </div>
  );
};

export default SubMenuItem;
