import React from 'react';
import InputText from '../../shared/html/input_text';
import Strings, { getString } from '../../../util/localization/strings';

const STYLE = {
  height: '32px',
};

const SearchStore = ({onChange}) => {
  return (
    <InputText
      style={STYLE}
      onChange={{
        func : onChange,
        args : []
      }}
      placeholder={getString(Strings.SEARCH_STORE)}
    />
  );
};

export default SearchStore;
