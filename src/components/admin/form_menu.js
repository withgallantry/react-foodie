import React from 'react';
import { Event } from './admin';

const btnMenuStyle = {
  marginBottom: '20px'
};

const firstBtnStyle = {
  marginLeft: '160px'
};

const otherBtnStyle = {
  marginLeft: '10px'
};

const FormMenu = ({onClick}) => {
  return (
    <div style={btnMenuStyle}>
      <button
        style={firstBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => onClick(Event.SAVE)}>
        Save
      </button>
      <button
        style={otherBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => onClick(Event.NEW)}>
        New
      </button>
      <button
        style={otherBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => onClick(Event.COPY)}>
        Copy
      </button>
      <button
        style={otherBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => onClick(Event.DELETE)}>
        Delete
      </button>
    </div>
  );
};

export default FormMenu;
