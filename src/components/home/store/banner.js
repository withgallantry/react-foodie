import React from 'react';

import * as Constants from '../../../util/constants';

const STYLE = {
  width: '75%',
};

const Banner = ({src}) => {
  return (
    <div style={STYLE}>
      <img style={{width: '100%', height: '100%'}} src={`img/${src}`} />
    </div>
  );
};

export default Banner;
