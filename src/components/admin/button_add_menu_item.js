import React from 'react';
import Button from '../util/button';
import { Event } from './admin';

const style = {
  marginLeft: '160px',
  marginTop: '2px'
};

const ButtonAddMenuItem = ({onClick, index}) => {
  return (
    <Button
      style={style}
      onClick={{
        func : onClick,
        id : Event.NEW_MENU_ITEM,
        args : [index]
      }}
      classes=''
      glyphicon='plus'
    />
  );
};

export default ButtonAddMenuItem;
