import React from 'react';
import PropTypes from 'prop-types';

import Button from '../shared/html/button';

export const create = (glyph, func, id, args, style, tooltip) => {
  return (
    <MenuButton
      style={style}
      glyphicon={glyph}
      onClick={{ func, id, args }}
      tooltip={tooltip !== undefined ? tooltip : undefined}
    />
  );
};

const MenuButton = (props) => {
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
      tooltip={props.tooltip !== undefined ? props.tooltip : undefined}
    />
  );
};

MenuButton.propTypes = {
  style: PropTypes.object,
  glyphicon: PropTypes.string,
  onClick: PropTypes.shape({
    func: PropTypes.func,
    id: PropTypes.number,
    args: PropTypes.array,
  }),
  tooltip: PropTypes.string,
};
