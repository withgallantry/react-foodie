import React from 'react';

const Banner = ({src}) => {
  return (
      <img src={`img/${src}`} width='800' height='300'/>
  );
};

export default Banner;
