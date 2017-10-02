import React from 'react';
import InputText from '../../html/input_text';
import Strings, { getString } from '../../../util/localization/strings';

const style = {
  height: '32px',
};

const SearchStore = ({onChange}) => {
  return (
    <InputText
      style={style}
      onChange={{
        func : onChange,
        args : []
      }}
      placeholder={getString(Strings.SEARCH_STORE)}
    />
  );
};

export default SearchStore;
