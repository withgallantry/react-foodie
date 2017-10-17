import React from 'react';

const OrderItem = ({name, price, quantity, id}) => {
  return (
    <div>
      {`(${quantity})${name}`}
      <span style={{ float : 'right' }}>{`${price}`}</span>
    </div>
  );
};

export default OrderItem;
