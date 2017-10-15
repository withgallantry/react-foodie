import React from 'react';

import Banner from './banner';

const Header = ({src}) => {
  return (
    <div>
      <Banner src={src} />
      <div>...</div>
    </div>
  );
};

export default Header;
