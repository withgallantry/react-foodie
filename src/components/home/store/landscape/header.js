import React from 'react';

import Banner from './../banner';
import Details from './../details';
import * as Constants from '../../../../misc/constants';

const Header = ({img, store}) => {
  return (
    <div id={Constants.TOP_ID}>
      <Banner src={img} />
      <Details
        store={store}
        width={Constants.HOME_STORE_WIDTH}
        textAlign='left'
      />
    </div>
  );
};

export default Header;
