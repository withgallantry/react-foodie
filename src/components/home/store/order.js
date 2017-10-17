import React from 'react';

import OrderItem from './order_item';
import * as Constants from '../../../util/constants';

const STYLE = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  left: Constants.HOME_STORE_WIDTH,
  top: Constants.HOME_HEADER_HEIGHT,
  width: Constants.HOME_ORDER_WIDTH,
  overflowY: 'scroll',
};

const Order = ({items}) => {
  let orderItems = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
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
      </div>
  );
};

export default Order;
