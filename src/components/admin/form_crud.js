import React from 'react';
import Event from './event';
import Button from '../html/button';

const btnMenuStyle = {
  marginBottom: '20px'
};

const firstBtnStyle = {
  marginLeft: '160px'
};

const secondBtnStyle = {
  marginLeft: '10px'
};

const createButton = (style, func, disabled, id, label) => {
  return (
    <Button
      style={style}
      onClick={{ func, id }}
      label={label}
      disabled={disabled}
    />
  );
};

const FormCrud = ({onClick, deleteEnabled}) => {
  return (
    <div style={{btnMenuStyle}}>
      {createButton(firstBtnStyle,  onClick, false,          Event.SAVE,   'Save')}
      {createButton(secondBtnStyle, onClick, false,          Event.NEW,    'New')}
      {createButton(secondBtnStyle, onClick, false,          Event.COPY,   'Copy')}
      {createButton(secondBtnStyle, onClick, !deleteEnabled, Event.DELETE, 'Delete')}
    </div>
  );
};

export default FormCrud;
