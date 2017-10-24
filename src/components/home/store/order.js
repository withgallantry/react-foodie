import React from 'react';
import Switch from 'react-toggle-switch';

import Button from '../../shared/html/button';
import OrderItem from './order_item';
import * as Constants from '../../../misc/constants';
import * as Strings from '../../../misc/localization/strings';
import * as Util from '../../../misc/util';

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
  paddingBottom: '5px',
};

const SUB_TITLE_STYLE = {
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const TOTAL_STYLE = {
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
};

const ADDRESS_STYLE = {
  textAlign: 'center',
  margin: 0,
  padding: 0,
};

const TOTAL_PRICE_STYLE = {
  float: 'right',
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
};

const HR_STYLE = {
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
  padding: 0,
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
};

const SWITCH_STYLE = {
  textAlign: 'center',
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
};

const ORDERS_STYLE = {
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
};

const SWITCH_TEXT_STYLE = {
  marginLeft: '10px',
  marginRight: '10px',
  marginTop: '-10px',
  fontSize: FONT_SIZE,
};

const ORDER_MISSING_STYLE = {
  textAlign: 'center',
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
};

const BTN_STYLE = {
  fontSize: '14pt',
  width: '95%',
  marginTop: '5px',
  marginLeft: '2.5%',
  marginBottom: Constants.HOME_ORDER_MARGIN_LEFT,
};

const FONT_SIZE = '12pt';

const getTotal = (items) => {
  let total = 0;
  for (let item of items) {
    total += (Util.getNumericValue(item.price) * item.quantity);
  }
  return total;
}

const Order = ({onClick, showMenuForItem, onEnter, onLeave, onToggleSwitch, switched, address, name, items}) => {
  let orderItems = [];
  for (let item of items) {
    orderItems.push((
      <OrderItem
        key={item.id}
        onClick={onClick}
        showMenu={showMenuForItem === item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        onEnter={onEnter}
        onLeave={onLeave}
      />
    ));
  }

  const total = getTotal(items);
  const deliveryFee = Constants.DELIVERY_FEE;

  return (
      <div style={STYLE}>
        <div style={SWITCH_STYLE}>
          <span style={SWITCH_TEXT_STYLE}>{Strings.get(Strings.DELIVERY)}</span>
          <Switch onClick={onToggleSwitch} on={switched}/>
          <span style={SWITCH_TEXT_STYLE}>{Strings.get(Strings.PICKUP)}</span>
        </div>
        {address !== undefined && switched === false &&
          <div style={{ marginTop: Constants.HOME_ORDER_MARGIN_LEFT }}>
            <p style={ADDRESS_STYLE}>{Strings.get(Strings.DELIVERING).toUpperCase()}</p>
            <p style={ADDRESS_STYLE}>{address.toUpperCase()}</p>
          </div>
        }
        <h3 style={TITLE_STYLE}>{Strings.get(Strings.ORDER_FROM)}</h3>
        <h3 style={SUB_TITLE_STYLE}>{name}</h3>
        {orderItems.length <= 0 &&
          <p style={ORDER_MISSING_STYLE}>{Strings.get(Strings.ORDER_MISSING)}</p>
        }
        <div style={ORDERS_STYLE}>
          {orderItems}
        </div>
        <hr style={HR_STYLE}/>
        <div style={TOTAL_STYLE}>
          {Strings.get(Strings.SUB_TOTAL)}: <span style={TOTAL_PRICE_STYLE}>{`${total} ${Constants.CURRENCY}`}</span><br/>
          {Strings.get(Strings.DELIVERY_FEE)}: <span style={TOTAL_PRICE_STYLE}>{`${deliveryFee} ${Constants.CURRENCY}`}</span><br/>
          <b>{Strings.get(Strings.TOTAL)}: <span style={TOTAL_PRICE_STYLE}>{`${(total + deliveryFee)} ${Constants.CURRENCY}`}</span></b><br/>
        </div>
        {orderItems.length > 0 &&
          <div style={BTN_STYLE}>
            <Button
              style={BTN_STYLE}
              modal={Constants.MODAL_CHECKOUT}
              label={Strings.get(Strings.CHECKOUT)}
            />
          </div>
        }
      </div>
  );
};

export default Order;
