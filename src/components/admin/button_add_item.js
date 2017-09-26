import React from 'react';
import Button from '../util/button';
import { Event } from './admin';

const style = {
  marginLeft: '160px',
  marginTop: '2px'
};

const ButtonAddItem = ({onClick, arg}) => {
  return (
    <Button
      style={style}
      onClick={{
        func : onClick,
        id : Event.NEW_MENU_ITEM,
        arg
      }}
      classes=''
      glyphicon='plus'
    />
  );
};

export default ButtonAddItem;
