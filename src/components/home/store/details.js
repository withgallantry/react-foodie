import React from 'react';
import PropTypes from 'prop-types';

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

const pTags = {
  fontSize: '12pt',
};

const pAddress = {
  fontSize: '10pt',
};

const Details = ({address, name, tags, opensAt, closesAt}) => {
  const title = <h2 style={h2}>{name}</h2>;
  const joinedTags = <p style={pTags}>{tags.join(" • ")}</p>;
  address = <p style={pAddress}>{address}</p>;
  const hours = <span>{
    `Hours Open: ${opensAt.hours}.${opensAt.minutes}` +
    ` - ${closesAt.hours}.${closesAt.minutes}`
  }</span>;

  return (
    <div style={div}>
      {title}
      &nbsp;
      {joinedTags}
      {address}
      {hours}
    </div>
  );
};

Details.propTypes = {
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  opensAt: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string,
  }),
  closesAt: PropTypes.shape({
    hours: PropTypes.string,
    minutes: PropTypes.string,
  }),
};

export default Details;
