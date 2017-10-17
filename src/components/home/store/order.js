import React from 'react';

import OrderItem from './order_item';
import * as Constants from '../../../util/constants';
import * as Util from '../../../util/util';

const STYLE = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: Constants.HOME_STORE_WIDTH,
  top: Constants.HOME_HEADER_HEIGHT,
  width: Constants.HOME_ORDER_WIDTH,
  overflowY: 'scroll',
};

const TITLE_STYLE = {
  textAlign: 'center',
  paddingTop: Constants.HOME_ORDER_MARGIN_LEFT,
  paddingBottom: Constants.HOME_ORDER_MARGIN_LEFT,
};

const TOTAL_STYLE = {
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
};

const TOTAL_PRICE_STYLE = {
  float: 'right',
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
};

const getTotal = (items) => {
  let total = 0;
  for (let item of items) {
    total += (Util.getNumericValue(item.price) * item.quantity);
  }
  return `${total} SEK`;
}

const Order = ({items}) => {
  let orderItems = [];
  for (let item of items) {
    orderItems.push((
      <OrderItem
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
      />
    ));
  }
  return (
      <div style={STYLE}>
        <h3 style={TITLE_STYLE}>Order details</h3>
        {orderItems}
        <br />
        <p style={TOTAL_STYLE}>
          Total: <span style={TOTAL_PRICE_STYLE}>{getTotal(items)}</span>
        </p>
      </div>
  );
};

export default Order;
