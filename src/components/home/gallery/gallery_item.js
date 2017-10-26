import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as Strings from '../../../misc/localization/strings';

const div = {
  position: 'relative',
  width: '300px',
  height: '300px',
  display: 'inline-block',
  marginLeft: '2%',
  overflow: 'hidden',
};

const divInfo = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis' ,
  overflow: 'hidden',
};

const GalleryItem = ({gallery, isOpen, name, id, tags, hours}) => {
  return (
    <div style={div}>
      <Link to={`/store/${id}`}>
        <div className='gallery-img-container'>
          <img
            className='gallery-img'
            src={`img/${gallery}`}
          />
        </div>
      </Link>
      {isOpen === true
        ? undefined
        : (
          <div>
            <span className='gallery-closed-bg'></span>
            <span className='gallery-closed-text'>{Strings.get(Strings.CLOSED)}</span>
          </div>
        )}
      <div style={divInfo}><b>{name}</b></div>
      {<div style={divInfo}>{tags.join(" • ")}</div>}
      {<div style={divInfo}>{
        `${hours.opensAt.hours}:${hours.opensAt.minutes} - `
        + `${hours.closesAt.hours}:${hours.closesAt.minutes}`}</div>}
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
