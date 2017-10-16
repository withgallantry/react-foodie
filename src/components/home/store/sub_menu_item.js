import React from 'react';

import * as Constants from '../../../util/constants';

const STYLE = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT,
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

const SubMenuItem = ({item, index, menu}) => {
  return (
    <div style={STYLE}>
      <p>{item.name}</p>
      <span style={DESC_STYLE}>• &nbsp; {item.desc}</span>
      <span style={PRICE_STYLE}>{item.price}</span>
    </div>
  );
};

export default SubMenuItem;
