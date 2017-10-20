import React from 'react';

import OrderItemMenu from './order_item_menu';
import * as Constants from '../../../misc/constants';

const STYLE = {
  paddingLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  paddingRight: Constants.HOME_ORDER_MARGIN_LEFT,
  paddingTop: '8px',
  paddingBottom: '8px'
};

const PRICE_STYLE = {
  float: 'right',
};

const OrderItem = ({onClick, showMenu, onEnter, onLeave, name, price, quantity, id}) => {
  return (
    <div
      onMouseEnter={() => onEnter(id)}
      onMouseLeave={() => onLeave()}
      onBlur={() => console.log('focus')}
      className='order-item'
      style={STYLE}>
      {`${quantity} x ${name}`}
      {showMenu && <OrderItemMenu onClick={onClick} id={id}/>}
      <span style={PRICE_STYLE}>{`${(price * quantity)} ${Constants.CURRENCY}`}</span>
    </div>
  );
};

export default OrderItem;
