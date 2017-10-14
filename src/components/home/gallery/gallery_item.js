import React from 'react';
import * as Strings from '../../../util/localization/strings';

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

const GalleryItem = (props) => {
  return (
    <div style={STYLE}>
      <img className='gallery-img' src={`img/${props.images.gallery}`} />
      {props.isOpen === true
        ? undefined
        : (
          <div>
            <span className='gallery-closed-bg'></span>
            <span className='gallery-closed-text'>{Strings.get(Strings.CLOSED)}</span>
          </div>
        )}
      <div style={INFO_STYLE}><b>{props.name}</b></div>
      {<div style={INFO_STYLE}>{props.tags.join(" • ")}</div>}
      {<div style={INFO_STYLE}>{
        `${props.hours.opensAt.hours}:${props.hours.opensAt.minutes} - `
        + `${props.hours.closesAt.hours}:${props.hours.closesAt.minutes}`}</div>}
    </div>
  );
};

export default GalleryItem;
