import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../shared/html/button';
import * as Event from './event';

const span = {
  float: 'left',
};

const btn = {
  marginLeft: '2px',
  marginRight: '2px',
  paddingLeft: '5px',
  paddingRight: '5px',
  paddingTop: 0,
  paddingBottom: 0,
};

const createButton = (onClick, id, event, style, glyph) => {
  return (
    <Button
      style={style}
      className='btn btn-default order-item-button'
      glyphicon={glyph}
      onClick={{
        func : onClick,
        id : event,
        args : [id]
      }}
    />
  );
};

const OrderItemMenu = ({onClick, id}) => {
  return (
    <span style={span}>
      {createButton(onClick, id, Event.INCREASE_ITEM, btn, 'plus')}
      {createButton(onClick, id, Event.DECREASE_ITEM, btn, 'minus')}
      {createButton(onClick, id, Event.REMOVE_ITEM,   btn, 'trash')}
    </span>
  );
};

OrderItemMenu.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default OrderItemMenu;
