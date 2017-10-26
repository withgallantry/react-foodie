import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  return (
      <button
        data-tip={props.tooltip !== undefined ? props.tooltip : undefined}
        data-delay-show='500'
        data-toggle={props.modal !== undefined ? 'modal' : undefined}
        data-target={props.modal !== undefined ? `#${props.modal}` : undefined}
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
        {props.image !== undefined &&
          <img style={props.image.style} src={props.image.src} />
        }
        {props.label !== undefined ? props.label : undefined}
      </button>
  );
};

Button.propTypes = {
  tooltip: PropTypes.string,
  modal: PropTypes.string,
  disabled: PropTypes.bool,
  classes: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.object,
  glyphicon: PropTypes.string,
  image: PropTypes.object,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
};

export default Button;
