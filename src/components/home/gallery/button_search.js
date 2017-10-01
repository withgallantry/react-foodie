import React from 'react';
import Button from '../../html/button';
import Strings, { getString } from '../../../util/localization/strings';

const ButtonSearch = ({onClick}) => {
  return (
      <Button
        label={getString(Strings.SEARCH_STORE)}
        onClick={{
          func : onClick
        }}
      />
  );
};

export default ButtonSearch;
