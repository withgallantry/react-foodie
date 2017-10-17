import React from 'react';

//(Util.getNumericValue(item.price) * item.quantity);

const OrderItem = ({name, price, quantity, id}) => {
  return (
    <div>
      {`(${quantity})${name}`}
      <span style={{ float : 'right' }}>{`${price}`}</span>
    </div>
  );
};

export default OrderItem;
