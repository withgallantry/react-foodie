import React from 'react';

import Button from '../../shared/html/button';

const ButtonNavBar = ({onClick, label, id}) => {
  return (
      <Button
        label={label}
        onClick={{ func : onClick, id }}
      />
  );
};

export default ButtonNavBar;
