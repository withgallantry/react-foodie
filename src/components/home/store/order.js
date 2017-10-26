import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-toggle-switch';

import Button from '../../shared/html/button';
import OrderItem from './order_item';
import * as Constants from '../../../misc/constants';
import * as Strings from '../../../misc/localization/strings';
import * as Util from '../../../misc/util';

const h3Title = {
  textAlign: 'center',
  paddingTop: Constants.HOME_ORDER_MARGIN_LEFT,
  paddingBottom: '5px',
};

const h3SubTitle = {
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const divTotal = {
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  textAlign: 'left',
};

const pDelivery = {
  textAlign: 'center',
  margin: 0,
  padding: 0,
};

const spanTotalPrice = {
  float: 'right',
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
};

const hr = {
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
  padding: 0,
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
};

const divSwitch = {
  textAlign: 'center',
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
};

const divOrders = {
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
};

const spanSwitchText = {
  marginLeft: '10px',
  marginRight: '10px',
  marginTop: '-10px',
  fontSize: '12pt',
};

const pOrderMissing = {
  textAlign: 'center',
  marginLeft: Constants.HOME_ORDER_MARGIN_LEFT,
  marginRight: Constants.HOME_ORDER_MARGIN_LEFT,
  marginTop: Constants.HOME_ORDER_MARGIN_LEFT,
};

const btn = {
  fontSize: '14pt',
  width: '95%',
  marginTop: '5px',
  marginLeft: '2.5%',
  marginBottom: Constants.HOME_ORDER_MARGIN_LEFT,
};

const getTotal = (items) => {
  let total = 0;
  for (let item of items) {
    total += (Util.getNumericValue(item.price) * item.quantity);
  }
  return total;
}

const Order = ({
  style, onClick, showMenuForItem, onEnter, onLeave,
  onToggleSwitch, switched, address, name, items}) =>
{
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
      <div style={style}>
        <div style={divSwitch}>
          <span style={spanSwitchText}>{Strings.get(Strings.DELIVERY)}</span>
          <Switch onClick={onToggleSwitch} on={switched}/>
          <span style={spanSwitchText}>{Strings.get(Strings.PICKUP)}</span>
        </div>
        {address !== undefined && switched === false &&
          <div style={{ marginTop: Constants.HOME_ORDER_MARGIN_LEFT }}>
            <p style={pDelivery}>{Strings.get(Strings.DELIVERING).toUpperCase()}</p>
            <p style={pDelivery}>{address.toUpperCase()}</p>
          </div>
        }
        <h3 style={h3Title}>{Strings.get(Strings.ORDER_FROM)}</h3>
        <h3 style={h3SubTitle}>{name}</h3>
        {orderItems.length <= 0 &&
          <p style={pOrderMissing}>{Strings.get(Strings.ORDER_MISSING)}</p>
        }
        <div style={divOrders}>
          {orderItems}
        </div>
        <hr style={hr}/>
        <div style={divTotal}>
          {Strings.get(Strings.SUB_TOTAL)}: <span style={spanTotalPrice}>{`${total} ${Constants.CURRENCY}`}</span><br/>
          {Strings.get(Strings.DELIVERY_FEE)}: <span style={spanTotalPrice}>{`${deliveryFee} ${Constants.CURRENCY}`}</span><br/>
          <b>{Strings.get(Strings.TOTAL)}: <span style={spanTotalPrice}>{`${(total + deliveryFee)} ${Constants.CURRENCY}`}</span></b><br/>
        </div>
        {orderItems.length > 0 &&
          <div style={btn}>
            <Button
              style={btn}
              modal={Constants.MODAL_CHECKOUT}
              label={Strings.get(Strings.CHECKOUT)}
            />
          </div>
        }
      </div>
  );
};

Order.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
  showMenuForItem: PropTypes.string,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  onToggleSwitch: PropTypes.func,
  switched: PropTypes.bool,
  address: PropTypes.string,
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number
  })),
};

export default Order;
