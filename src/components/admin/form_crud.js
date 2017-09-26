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

const FormCrud = ({onClick}) => {
  return (
    <div style={btnMenuStyle}>
      <Button
        style={firstBtnStyle}
        onClick={() => onClick(Event.SAVE)}
        label='Save'
      />
      <Button
        style={secondBtnStyle}
        onClick={() => onClick(Event.NEW)}
        label='New'
      />
      <Button
        style={secondBtnStyle}
        onClick={() => onClick(Event.COPY)}
        label='Copy'
      />
      <Button
        style={secondBtnStyle}
        onClick={() => onClick(Event.DELETE)}
        label='Delete'
      />
    </div>
  );
};

export default FormCrud;
