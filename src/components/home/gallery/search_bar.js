import React from 'react';
import ReactTooltip from 'react-tooltip';

import InputText from '../../shared/html/input_text';
import * as Constants from '../../../misc/constants';
import * as Strings from '../../../misc/localization/strings';

const style = {
  height: '32px',
  width: '90%',
  textAlign: 'center',
  marginTop: Constants.HOME_GALLERY_SEARCH_MARGIN_TOP,
  marginBottom: Constants.HOME_GALLERY_MARGIN_TOP,
  paddingTop: '4px',
};

const SearchBar = ({onSearch, width}) => {
  style.width = width;
  return (
    <div style={{ textAlign : 'center' }}>
      <InputText
        style={style}
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
