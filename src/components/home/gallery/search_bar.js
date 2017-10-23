import React from 'react';

import InputText from '../../shared/html/input_text';
import * as Constants from '../../../misc/constants';
import * as Strings from '../../../misc/localization/strings';

const STYLE = {
  height: '32px',
  width: '50%',
  textAlign: 'center',
  marginTop: Constants.HOME_GALLERY_SEARCH_MARGIN_TOP,
  marginBottom: Constants.HOME_GALLERY_MARGIN_TOP
};

const SearchBar = ({onSearch}) => {
  return (
    <div style={{ textAlign : 'center' }}>
      <InputText
        style={STYLE}
        onChange={{
          func : onSearch,
          args : []
        }}
        placeholder={Strings.get(Strings.SEARCH_STORE)}
      />
    </div>
  );
};

export default SearchBar;
