import React from 'react';

const Button = (props) => {
  return (
      <button
        className={props.classes !== undefined ? props.classes : 'btn btn-default'}
        style={props.style !== undefined ? props.style : {}}
        type={props.type !== undefined ? props.type : 'button'}
        onClick={
          props.onClick !== undefined
            ? () => {props.onClick.func(props.onClick.id, props.onClick.args)}
            : void(0)}>
        <span className={props.glyphicon !== undefined ? `glyphicon glyphicon-${props.glyphicon}` : ''}></span>
        {props.label !== undefined ? props.label : void(0)}
      </button>
  );
};

export default Button;
