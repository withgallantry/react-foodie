import React from 'react';

import * as Constants from '../../../util/constants';

//(Util.getNumericValue(item.price) * item.quantity);

const STYLE = {
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
};

const PRICE_STYLE = {
  float: 'right',
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
};

const OrderItem = ({name, price, quantity, id}) => {
  return (
    <div style={STYLE}>
      {`(${quantity})${name}`}
      <span style={PRICE_STYLE}>{`${price}`}</span>
    </div>
  );
};

export default OrderItem;
