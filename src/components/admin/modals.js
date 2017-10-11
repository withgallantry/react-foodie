import React from 'react';
import Event from './event';

const gallery = [];
const banners = [];

const imageContainerStyle = {
  width: '95%',
  margin: 'auto'
};

const fillImageLists = () => {
  const imageCount = 30;
  for (let i = 0; i < imageCount; ++i) {
    gallery.push(`gallery${i}.png`);
    banners.push(`banner${i}.png`);
  }
}

const getGalleryList = (onClick) => {
  return getList(gallery, Event.SET_IMAGE_GALLERY, onClick, '174px', '100px');
};

const getBannerList = (onClick) => {
  return getList(banners, Event.SET_IMAGE_BANNER, onClick, '174px', '70px');
};

const getList = (array, id, onClick, width, height) => {
  const style = {
    maxWidth: width,
    minWidth: width,
    maxHeight: height,
    minHeight: height,
    padding: 1,
  };
  const buttonStyle = {
    margin: '3px',
    padding: 0,
  };
  let result = [];
  for (let i = 0; i < array.length; ++i) {
    result.push(
      <button
        style={buttonStyle}
        key={`arrayList[${id}][${i}]`}
        type='button'
        data-dismiss='modal'
        onClick={() => onClick(id, array[i])}>
        <img
          style={style}
          src={`img/${array[i]}`}>
        </img>
      </button>
    );
  }
  return result;
};

const Modals = ({onClick}) => {
  if (gallery.length == 0 || banners.length == 0) {
    fillImageLists();
  }

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
