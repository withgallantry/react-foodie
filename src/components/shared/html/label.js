import React from 'react';
import PropTypes from 'prop-types';

const Label = (props) => {
  return (
      <label
        style={props.style !== undefined ? props.style : {}}
        htmlFor={props.htmlFor !== undefined ? props.htmlFor : ''}>
        {props.text !== undefined ? props.text : 'label'}
      </label>
  );
};

Label.propTypes = {
  style: PropTypes.object,
  htmlFor: PropTypes.string,
  text: PropTypes.string,
};

export default Label;
