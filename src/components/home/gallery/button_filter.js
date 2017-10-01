import React from 'react';
import Button from '../../html/button';
import Strings, { getString } from '../../../util/localization/strings';

const ButtonFilter = ({onClick}) => {
  return (
      <Button
        label={getString(Strings.FILTER)}
        onClick={{
          func : onClick
        }}
      />
  );
};

export default ButtonFilter;
