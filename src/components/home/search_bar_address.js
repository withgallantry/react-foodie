import React from 'react';
import InputText from '../html/input_text';
import Strings, { getString } from '../util/localization/strings';

const style = {
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
};

const SearchBarAddress = ({onChange}) => {
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

export default SearchBarAddress;
