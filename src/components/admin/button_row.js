import React from 'react';
import Button from '../util/html/button';

export const createButton = (glyph, func, id, args, style) => {
  return (
    <ButtonRow
      style={style}
      glyphicon={glyph}
      onClick={{ func, id, args }}
    />
  );
};

const ButtonRow = (props) => {
  return (
    <Button
      style={props.style !== undefined ? props.style : {}}
      glyphicon={props.glyphicon}
      onClick={{
        func : props.onClick.func,
        id : props.onClick.id,
        args : props.onClick.args
      }}
      classes=''
    />
  );
};

export default ButtonRow;
