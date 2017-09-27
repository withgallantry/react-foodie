import React from 'react';
import Button from '../util/button';
import Event from './event';

const style = {
  marginLeft: '160px',
  marginBottom: '40px'
};

const ButtonAddMenu = ({onClick}) => {
  return (
    <Button
      style={style}
      onClick={{
        func : onClick,
        id : Event.NEW_MENU,
      }}
      classes=''
      glyphicon='plus'
    />
  );
};

export default ButtonAddMenu;
