import React from 'react';

import * as Constants from '../../../misc/constants';

const div = {
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  width: '100%',
};

const h2 = {
  display: 'inline',
};

const p = {
  fontSize: '12pt',
};

const Details = ({store, width}) => {
  div.width = width;
  const title = <h2 style={h2}>{store.name}</h2>;
  const tags = <p style={p}>{store.tags.join(" • ")}</p>;
  const hours = <span>{
    `Hours Open: ${store.hours.opensAt.hours}.${store.hours.opensAt.minutes}` +
    ` - ${store.hours.closesAt.hours}.${store.hours.closesAt.minutes}`
  }</span>;

  return (
    <div style={div}>
      {title}
      &nbsp;
      {tags}
      {hours}
    </div>
  );
};

export default Details;
