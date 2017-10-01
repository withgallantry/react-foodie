import React from 'react';
import NavBar from './nav_bar';

const style = {
  position: 'absolute',
  top: '70px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const Gallery = () => {
  return (
    <div style={style}>
      <NavBar />
    </div>
  );
};

export default Gallery;
