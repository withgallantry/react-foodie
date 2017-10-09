import React from 'react';
import Event from './event';

const imageContainerStyle = {
  width: '95%',
  margin: 'auto'
};

const getGalleryList = (onClick) => {
  const style = {
    maxWidth: '174px',
    padding: 1,
  };
  const buttonStyle = {
    margin: '3px',
    padding: 0,
  };
  var result = [];
  for (let i = 0; i < 10; ++i) {
    result.push(
      <button
        style={buttonStyle}
        key={`imageList[${i}]`}
        type='submit'
        onClick={() => onClick(Event.SET_IMAGE_GALLERY, 'gallery.png')}>
        <img
          style={style}
          src='img/gallery.png'>
        </img>
      </button>
    );
  }
  return result;
};

const getBannerList = (onClick) => {
  const style = {
    maxWidth: '174px',
    padding: 1,
  };
  const buttonStyle = {
    margin: '3px',
    padding: 0,
  };
  var result = [];
  for (let i = 0; i < 10; ++i) {
    result.push(
      <button
        style={buttonStyle}
        key={`imageList[${i}]`}
        type='submit'
        onClick={() => onClick(Event.SET_IMAGE_BANNER, 'banner.png')}>
        <img
          style={style}
          src='img/banner.png'>
        </img>
      </button>
    );
  }
  return result;
};

const Modals = ({onClick}) => {
  return (
    <div>
      <div className='modal fade' id={`imageModal${Event.SET_IMAGE_GALLERY}`} role="dialog">
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>Select image for gallery</h4>
            </div>
            <div className='modal-body'>
              <div style={imageContainerStyle}>
                {getGalleryList(onClick)}
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' id={`imageModal${Event.SET_IMAGE_BANNER}`} role="dialog">
        <div className='modal-dialog modal-xl'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' data-dismiss='modal'>&times;</button>
              <h4 className='modal-title'>Select image for banner</h4>
            </div>
            <div className='modal-body'>
              <div style={imageContainerStyle}>
                {getBannerList(onClick)}
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;
