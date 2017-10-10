import React from 'react';
import InputText from '../shared/html/input_text';
import Strings, { getString } from '../../util/localization/strings';

const style = {
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
};

const SearchAddress = ({onChange}) => {
  return (
    <div style={style}>
      <InputText
        onChange={{
          func : onChange
        }}
        placeholder={getString(Strings.SEARCH_ADDRESS)}
      />
    </div>
  );
};

export default SearchAddress;
