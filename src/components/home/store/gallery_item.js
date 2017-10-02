import React from 'react';

const style = {
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
      <img src='img/temp.png' />
      {props.name} <br />
      {_.map(props.tags, (tag) => {
        return <p key={`${props.name}${tag}`} style={tagStyle}>&bull; {tag} </p>
      })}
      {<p style={tagStyle}>&bull;</p>} <br />
      {props.hours[0]} - {props.hours[1]}
    </div>
  );
};

export default GalleryItem;
