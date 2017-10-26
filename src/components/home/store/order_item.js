import React from 'react';
import PropTypes from 'prop-types';

import OrderItemMenu from './order_item_menu';
import * as Constants from '../../../misc/constants';

const div = {
  paddingLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  paddingRight: Constants.HOME_ORDER_MARGIN_LEFT,
  paddingTop: '8px',
  paddingBottom: '8px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  textAlign: 'left',
};

const priceSpan = {
  float: 'right',
};

const OrderItem = ({onClick, showMenu, onEnter, onLeave, name, price, quantity, id}) => {
  return (
    <div
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={() => onLeave()}
      onBlur={() => console.log('focus')}
      className='order-item'
      style={div}>
      {`${quantity} x ${name}`}
      {showMenu && <OrderItemMenu onClick={onClick} id={id}/>}
      <span style={priceSpan}>{`${(price * quantity)} ${Constants.CURRENCY}`}</span>
    </div>
  );
};

OrderItem.propTypes = {
  onClick: PropTypes.func,
  showMenu: PropTypes.bool,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  name: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.number,
  id: PropTypes.string,
};

export default OrderItem;
