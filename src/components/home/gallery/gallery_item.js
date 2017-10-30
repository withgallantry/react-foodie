import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Settings from '../../../misc/settings';
import * as Strings from '../../../misc/localization/strings';

const div = {
  position: 'relative',
  width: '300px',
  height: '270px',
  display: 'inline-block',
  marginLeft: '2%',
  overflow: 'hidden',
  marginTop: '15px',
};

const divInfoItem = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis' ,
  overflow: 'hidden',
};

const divInfo = {
  padding: '5px',
  textAlign: 'center',
};

const GalleryItem = ({gallery, isOpen, name, id, tags, hours}) => {
  // allow clicking on closed stores in debug
  const jsxClosed = Settings.get(Settings.DEBUG)
    ? (<div>
        <Link to={`/store/${id}`}>
          <span className='gallery-closed-bg'></span>
          <span className='gallery-closed-text'>{Strings.get(Strings.CLOSED)}</span>
        </Link>
      </div>)
    : (<div>
        <span className='gallery-closed-bg'></span>
        <span className='gallery-closed-text'>{Strings.get(Strings.CLOSED)}</span>
      </div>);

  return (
    <div style={div} className={isOpen ? 'gallery-item' : ''}>
      <Link to={`/store/${id}`}>
        <div className='gallery-img-container'>
          <img
            className='gallery-img'
            src={`img/gallery0.png`}
          />
        </div>
      </Link>
      {isOpen === false && jsxClosed}
      <div style={divInfo}>
        <div style={divInfoItem}><b>{name}</b></div>
        {<div style={divInfoItem}>{tags.join(" • ")}</div>}
        {<div style={divInfoItem}>{
          `${hours.opensAt.hours}:${hours.opensAt.minutes} - `
          + `${hours.closesAt.hours}:${hours.closesAt.minutes}`}</div>}
      </div>
    </div>
  );
};

GalleryItem.propTypes = {
  gallery: PropTypes.string,
  isOpen: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  hours: PropTypes.shape({
    opensAt: PropTypes.shape({
      hours: PropTypes.string,
      minutes: PropTypes.string,
    }),
    closesAt: PropTypes.shape({
      hours: PropTypes.string,
      minutes: PropTypes.string,
    }),
  }),
};

export default GalleryItem;
