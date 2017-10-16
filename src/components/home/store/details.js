import React from 'react';

import * as Constants from '../../../util/constants';

const STYLE = {
  width: Constants.HOME_STORE_WIDTH,
};

const Details = ({store}) => {
  return (
    <div style={STYLE}>
      <b>{store.name}</b>{`, ${store.tags.join(" • ")}`}
    </div>
  );
};

export default Details;
