import React from 'react';
import Button from '../util/button';

const ButtonMoveRow = (props) => {
  console.log(props);
  return (
    <Button
      glyphicon={props.glyphicon}
      onClick={{
        func : props.onClick.func,
        id : props.onClick.id,
        args : props.onClick.arg
      }}
      classes=''
    />
  );
};

export default ButtonMoveRow;
