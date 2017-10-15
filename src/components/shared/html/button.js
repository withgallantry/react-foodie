import React from 'react';

const Button = (props) => {
  return (
      <button
        data-tip={props.tooltip !== undefined ? props.tooltip : undefined}
        data-delay-show='500'
        disabled={props.disabled !== undefined ? props.disabled : false}
        className={props.classes !== undefined ? props.classes : 'btn btn-default'}
        style={props.style !== undefined ? props.style : {}}
        type={props.type !== undefined ? props.type : 'button'}
        onClick={
          props.onClick !== undefined
            ? () => {props.onClick.func(props.onClick.id, props.onClick.args)}
            : undefined}>
        <span className={
          props.glyphicon !== undefined
            ? `glyphicon glyphicon-${props.glyphicon}`
            : ''
        }></span>
        {props.label !== undefined ? props.label : undefined}
      </button>
  );
};

export default Button;
