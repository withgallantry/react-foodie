import React from 'react';

import Banner from './banner';
import Details from './details';

const Header = ({img, store}) => {
  return (
    <div>
      <Banner src={img} />
      <Details store={store} />
    </div>
  );
};

export default Header;
