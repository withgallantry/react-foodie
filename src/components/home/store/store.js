import React, { Component } from 'react';

import OrderDetails from './order_details';

class Store extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Store
        <OrderDetails />
      </div>
    );
  }
}

export default Store;
