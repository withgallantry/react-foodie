import React from 'react';

import * as Constants from '../../../misc/constants';

const div = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT,
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

const TITLE_STYLE = {
  display: 'inline',
};

const TAG_STYLE = {
  fontSize: '12pt',
};

const Details = ({store, width, textAlign}) => {
  div.width = width;
  div.textAlign = textAlign;

  const title = <h2 style={TITLE_STYLE}>{store.name}</h2>;
  const tags = <p style={TAG_STYLE}>{store.tags.join(" • ")}</p>;
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
