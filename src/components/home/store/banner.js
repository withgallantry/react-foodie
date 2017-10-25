import React from 'react';

import * as Constants from '../../../misc/constants';

const img = {
  width: '100%',
  height: '100%',
};

const Banner = ({src}) => {
  return (
    <div>
      <img style={img} src={`img/${src}`} />
    </div>
  );
};

export default Banner;
