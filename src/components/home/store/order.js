import React from 'react';

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

const Order = () => {
  return (
      <div style={STYLE}>
        Order
      </div>
  );
};

export default Order;
