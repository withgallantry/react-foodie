import React from 'react';
import PropTypes from 'prop-types';

import * as Constants from '../../../misc/constants';
import * as Event from './event';

const div = {
  paddingLeft: Constants.HOME_STORE_MARGIN_LEFT,
  marginTop: Constants.HOME_STORE_ITEM_MARGIN_VERTICAL,
  marginBottom: Constants.HOME_STORE_ITEM_MARGIN_VERTICAL,
  paddingRight: Constants.HOME_STORE_MARGIN_LEFT,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const spanPrice = {
  display: 'inline',
  float: 'right',
};

const spanDesc = {
  display: 'inline',
};

const SubMenuItem = ({onClick, item, index, menu}) => {
  return (
    <div
      className='sub-menu-item'
      style={div}
      onClick={() => onClick(Event.ADD_ITEM, [menu, index])}>
      <p style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{item.name}</p>
      <span style={spanDesc}>• &nbsp; {item.desc}</span>
      <span style={spanPrice}>{`${item.price} ${Constants.CURRENCY}`}</span>
    </div>
  );
};

SubMenuItem.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.shape({
    price: PropTypes.string,
    desc: PropTypes.string,
    name: PropTypes.string,
  }),
  index: PropTypes.number,
  menu: PropTypes.number,
};

export default SubMenuItem;
