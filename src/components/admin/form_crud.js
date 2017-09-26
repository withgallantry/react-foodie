import React from 'react';
import { Event } from './admin';
import Button from '../util/button';

const btnMenuStyle = {
  marginBottom: '20px'
};

const firstBtnStyle = {
  marginLeft: '160px'
};

const secondBtnStyle = {
  marginLeft: '10px'
};

const createButton = (style, func, id, label) => {
  return (
    <Button
      style={style}
      onClick={{ func, id }}
      label={label}
    />
  );
};

const FormCrud = ({onClick}) => {
  return (
    <div style={{btnMenuStyle}}>
      {createButton(firstBtnStyle,  onClick, Event.SAVE,   'Save')}
      {createButton(secondBtnStyle, onClick, Event.NEW,    'New')}
      {createButton(secondBtnStyle, onClick, Event.COPY,   'Copy')}
      {createButton(secondBtnStyle, onClick, Event.DELETE, 'Delete')}
    </div>
  );
};

export default FormCrud;
