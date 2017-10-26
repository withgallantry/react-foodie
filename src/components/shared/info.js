import React from 'react';
import PropTypes from 'prop-types';

import * as Constants from '../../misc/constants';
import * as Strings from '../../misc/localization/strings';

const div = {
  textAlign: 'center',
  marginLeft: Constants.HOME_GALLERY_MARGIN_LEFT,
  marginRight: Constants.HOME_GALLERY_MARGIN_LEFT,
  marginTop: '50px',
};

const Info = ({text, style}) => {
  return (
    <div style={style === undefined ? div : style}>
      <h3>{text}</h3>
    </div>
  );
};

Info.propTypes = {
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
};

export default Info;
