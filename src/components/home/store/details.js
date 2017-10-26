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

const p = {
  fontSize: '12pt',
};

const Details = ({name, tags, opensAt, closesAt}) => {
  const title = <h2 style={h2}>{name}</h2>;
  const joinedTags = <p style={p}>{tags.join(" • ")}</p>;
  const hours = <span>{
    `Hours Open: ${opensAt.hours}.${opensAt.minutes}` +
    ` - ${closesAt.hours}.${closesAt.minutes}`
  }</span>;

  return (
    <div style={div}>
      {title}
      &nbsp;
      {joinedTags}
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
