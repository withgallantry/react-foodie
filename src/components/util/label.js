import React from 'react';

const Label = (props) => {
  return (
      <label
        style={props.style !== undefined ? props.style : {}}
        htmlFor={props.htmlFor !== undefined ? props.htmlFor : ''}>
        {props.text !== undefined ? props.text : 'label'}
      </label>
  );
};

export default Label;
