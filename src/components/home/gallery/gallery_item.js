import React from 'react';
import { Link } from 'react-router-dom';

import * as Strings from '../../../misc/localization/strings';

const STYLE = {
  position: 'relative',
  width: '300px',
  height: '300px',
  display: 'inline-block',
  marginLeft: '2%',
  overflow: 'hidden',
};

const INFO_STYLE = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis' ,
  overflow: 'hidden',
};

const GalleryItem = ({images, isOpen, name, id, tags, hours}) => {
  return (
    <div style={STYLE}>
      <Link to={`/store/${id}`}>
        <div className='gallery-img-container'>
          <img
            className='gallery-img'
            src={`img/${images.gallery}`}
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
      <div style={INFO_STYLE}><b>{name}</b></div>
      {<div style={INFO_STYLE}>{tags.join(" • ")}</div>}
      {<div style={INFO_STYLE}>{
        `${hours.opensAt.hours}:${hours.opensAt.minutes} - `
        + `${hours.closesAt.hours}:${hours.closesAt.minutes}`}</div>}
    </div>
  );
};

export default GalleryItem;
