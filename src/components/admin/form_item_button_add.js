import React from 'react';
import Button from '../util/button';

const style = {
  marginRight: '12px'
}

const FormItemButtonAdd = (props) => {
  return (
    <Button
      style={style}
      onClick={{ func : props.onClick.func, id : props.onClick.id }}
      classes=''
      glyphicon='plus'
    />
  );
};

export default FormItemButtonAdd;
