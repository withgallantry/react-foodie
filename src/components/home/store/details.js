import React from 'react';

import * as Constants from '../../../util/constants';

const STYLE = {
  width: Constants.HOME_STORE_WIDTH,
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT,
  marginBottom: '20px',
  marginTop: '20px',
};

const Details = ({store}) => {
  //<b>{store.name}</b>{`, ${store.tags.join(" • ")}`}
  const title = <b>{store.name}</b>;
  const tags = store.tags.join(" • ");
  return (
    <div style={STYLE}>
      {title}
      &nbsp;
      {tags}
    </div>
  );
};

export default Details;
