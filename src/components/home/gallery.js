import React from 'react';

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
        <div style={{marginTop: '10px'}}>
          Gallery
        </div>
      </div>
  );
};

export default Gallery;
