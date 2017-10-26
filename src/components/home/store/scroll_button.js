import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../shared/html/button';
import * as Event from './event';

const btn = {
  position: 'fixed',
  left: '55%',
  top: '90%',
};

const ScrollButton = ({onClick}) => {
  return (
    <Button
      style={btn}
      classes='btn btn-default btn-circle btn-xl'
      glyphicon='arrow-up'
      onClick={{
        func : onClick,
        id : Event.SCROLL_TO_TOP
      }}
    />
  );
};

ScrollButton.propTypes = {
  onClick: PropTypes.func,
};

export default ScrollButton;
