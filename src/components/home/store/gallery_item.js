import React from 'react';
import Strings, { getString } from '../../../util/localization/strings';

const style = {
  position: 'relative',
  width: 300,
  height: 300,
  display: 'inline-block',
  marginLeft: '2%',
};

const tagStyle = {
  display: 'inline',
};

const GalleryItem = (props) => {
  return (
    <div style={style}>
      <img className='gallery-img' src={props.images.gallery} />
      {props.isOpen === true
        ? void (0)
        : (
          <div>
            <span className='gallery-closed-bg'></span>
            <span className='gallery-closed-text'>{getString(Strings.CLOSED)}</span>
          </div>
        )}
      <b>{props.name}</b> <br />
      {_.map(props.tags, (tag) => {
        return <p key={`${props.name}${tag}`} style={tagStyle}>&bull; {tag} </p>
      })}
      {<p style={tagStyle}>&bull;</p>} <br />
      {props.hours[0]} - {props.hours[1]}
    </div>
  );
};

export default GalleryItem;
