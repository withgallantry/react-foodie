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
        {orderItems}
        <br />
        <p>Total: <span style={{ float: 'right' }}>{getTotal(items)}</span></p>
      </div>
  );
};

export default Order;
