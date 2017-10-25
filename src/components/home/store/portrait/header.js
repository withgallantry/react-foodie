import React from 'react';

import Details from './../details';
import * as Constants from '../../../../misc/constants';

const Header = ({img, store}) => {
  return (
    <div id={Constants.TOP_ID}>
      <Details
        width={'100%'}
        textAlign='center'
        store={store}
      />
    </div>
  );
};

export default Header;
