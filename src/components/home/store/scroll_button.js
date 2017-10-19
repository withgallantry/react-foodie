import React from 'react';

import Button from '../../shared/html/button';
import * as Event from './event';

const STYLE = {
  position: 'fixed',
  left: '55%',
  top: '90%',
};

const ScrollButton = ({onClick}) => {
  return (
    <Button
      style={STYLE}
      classes='btn btn-default btn-circle btn-xl'
      glyphicon='arrow-up'
      onClick={{
        func : onClick,
        id : Event.SCROLL_TO_TOP
      }}
    />
  );
};

export default ScrollButton;
