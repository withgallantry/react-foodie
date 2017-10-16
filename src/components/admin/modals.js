import React from 'react';
import * as Event from './event';

let gallery = [];
let banners = [];

const IMAGE_CONTAINER_STYLE = {
  width: '95%',
  margin: 'auto'
};

const fillImageLists = () => {
  const galleryCount = 30;
  const bannerCount = 32;
  for (let i = 0; i < galleryCount; ++i) {
    gallery.push(`gallery${i}.png`);
  }
  for (let i = 0; i < bannerCount; ++i) {
    banners.push(`banner${i}.png`);
  }
}

const getGalleryList = (onClick) => {
  const width = 174;
  const height = width * (200/300);
  return getList(gallery, Event.SET_IMAGE_GALLERY, onClick, `${width}px`, `${height}px`);
};

const getBannerList = (onClick) => {
  const width = 265;
  const height = width * (360/1440);
  return getList(banners, Event.SET_IMAGE_BANNER, onClick, `${width}px`, `${height}px`);
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

const createModal = (text, id, list) => {
  return (
    <div className='modal fade' id={`imageModal${id}`} role="dialog">
      <div className='modal-dialog modal-xl'>
        <div className='modal-content'>
          <div className='modal-header'>
            <button type='button' className='close' data-dismiss='modal'>&times;</button>
            <h4 className='modal-title'>{text}</h4>
          </div>
          <div className='modal-body'>
            <div style={IMAGE_CONTAINER_STYLE}>
              {list}
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Modals = ({onClick}) => {
  if (gallery.length == 0 || banners.length == 0) {
    fillImageLists();
  }

  return (
    <div>
      {createModal('Select image for gallery', Event.SET_IMAGE_GALLERY, getGalleryList(onClick))}
      {createModal('Select image for banner',  Event.SET_IMAGE_BANNER,  getBannerList(onClick))}
    </div>
  );
};

export default Modals;
