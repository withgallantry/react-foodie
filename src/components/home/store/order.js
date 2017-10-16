import React from 'react';

import * as Constants from '../../../util/constants';

const STYLE = {
  position: 'absolute',
  right: 0,
  top: Constants.HOME_HEADER_HEIGHT,
  width: '25%',
  backgroundColor: 'rgb(230, 230, 230)',
};

const Order = () => {
  return (
      <div style={STYLE}>
        Order
      </div>
  );
};

export default Order;
