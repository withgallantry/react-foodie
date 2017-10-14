import React from 'react';
import * as Strings from '../../../util/localization/strings';

const STYLE = {
  position: 'relative',
  width: 300,
  height: 300,
  display: 'inline-block',
  marginLeft: '2%',
};

const TAG_STYLE = {
  display : 'inline'
};

const GalleryItem = (props) => {
  return (
    <div style={STYLE}>
      <img className='gallery-img' src={`img/${props.images.gallery}`} />
      {props.isOpen === true
        ? void (0)
        : (
          <div>
            <span className='gallery-closed-bg'></span>
            <span className='gallery-closed-text'>{Strings.get(Strings.CLOSED)}</span>
          </div>
        )}
      <b>{props.name}</b> <br />
      {_.map(props.tags, (tag) => {
        return <p key={`${props.name}${tag}`} style={TAG_STYLE}>&bull; {tag} </p>
      })}
      {<p style={TAG_STYLE}>&bull;</p>} <br />
      {`${props.hours.opensAt.hours}:${props.hours.opensAt.minutes} -
        ${props.hours.closesAt.hours}:${props.hours.closesAt.minutes}`}
    </div>
  );
};

export default GalleryItem;
