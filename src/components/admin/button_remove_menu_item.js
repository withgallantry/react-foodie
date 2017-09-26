import React from 'react';
import Button from '../util/button';
import { Event } from './admin';

const style = {
  marginRight: '12px'
};

const ButtonRemoveMenuItem = ({onClick, menu, item}) => {
  return (
    <Button
      style={style}
      onClick={{
        func : onClick,
        id : Event.REMOVE_MENU_ITEM,
        args : [menu, item]
      }}
      classes=''
      glyphicon='trash'
    />
  );
};

export default ButtonRemoveMenuItem;
