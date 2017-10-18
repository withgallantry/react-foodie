import React from 'react';

import Button from '../../shared/html/button';
import * as Event from './event';

const BUTTON_GROUP_STYLE = {
  float: 'left',
};

const STYLE = {
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
    <span style={BUTTON_GROUP_STYLE}>
      {createButton(onClick, id, Event.INCREASE_ITEM, STYLE, 'plus')}
      {createButton(onClick, id, Event.DECREASE_ITEM, STYLE, 'minus')}
      {createButton(onClick, id, Event.REMOVE_ITEM,   STYLE, 'trash')}
    </span>
  );
};

export default OrderItemMenu;
