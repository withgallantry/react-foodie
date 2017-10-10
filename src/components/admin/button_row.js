import React from 'react';
import Button from '../shared/html/button';

export const createButton = (glyph, func, id, args, style, tooltip) => {
  return (
    <ButtonRow
      style={style}
      glyphicon={glyph}
      onClick={{ func, id, args }}
      tooltip={tooltip !== undefined ? tooltip : void(0)}
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
      tooltip={props.tooltip !== undefined ? props.tooltip : void(0)}
    />
  );
};

export default ButtonRow;
