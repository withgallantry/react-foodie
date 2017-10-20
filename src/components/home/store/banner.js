import React from 'react';

import * as Constants from '../../../misc/constants';

const Banner = ({src}) => {
  return (
    <div>
      <img style={{width: '100%', height: '100%'}} src={`img/${src}`} />
    </div>
  );
};

export default Banner;
