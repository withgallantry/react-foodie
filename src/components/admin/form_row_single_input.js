import React from 'react';
import Label from '../shared/html/label';
import InputText from '../shared/html/input_text';
import DropDown from '../shared/html/drop_down';
import { RowType } from './form';
import Event from './event';

const imageSelectionStyle = {
  display: 'inline',
  padding: '1px',
};

const imageStyle = {
  maxWidth: '400px',
  maxHeight: '100px',
};

const createImageSelection = ({value, label}) => {
  const id = label.includes('gallery')
    ? Event.SET_IMAGE_GALLERY
    : Event.SET_IMAGE_BANNER;
  if (value !== undefined && value.length > 0) {
    return (
      <button
        style={imageSelectionStyle}
        type='button'
        data-toggle='modal'
        data-target={`#imageModal${id}`}>
        <img style={imageStyle} src={`img/${value}`} />
      </button>
    );
  }
  return (<div style={{ display : 'inline' }}></div>);
};

const createDropDowns = (props) => {
  let items = [];
  for (let i = 0; i < props.count; ++i) {
    items.push(
      <DropDown
        key={`dropDown[${props.ids[i]}]`}
        href={props.href}
        onClick={{
          func : props.onClick,
          id : props.ids[i],
        }}
        rows={props.rows[i]}
        style={props.style}
        title={props.selected[i]}
      />
    );
    if (i % 2 == 0) {
      items.push(
        <div
          key={`dropDown[${props.ids[i][i]}]`}
          style={{ display : 'inline' }}>
          &nbsp;:&nbsp;
          </div>
      );
    }
  }

  return (
    <div style={{ display : 'inline' }}>
      {items}
    </div>
  );
};

const createInput = (props) => {
  return (
    <InputText
      style={props.style !== undefined ? props.style : {}}
      size={props.size !== undefined ? props.size : undefined}
      id={props.id}
      onChange={
        props.onChange !== undefined
          ? {
              func : props.onChange.func,
              args : props.onChange.args
            }
          : {}
      }
      value={props.value !== undefined ? props.value : ''}
      placeholder={props.placeholder !== undefined ? props.placeholder : ''}
    />
  );
};

const FormRowSingleInput = ({div, label, input, type, dropDown, imageSelection}) => {
  return (
    <div
      style={div.style !== undefined ? div.style : {}}
      className={div.classes !== undefined ? div.classes : 'block'}>
      <Label
        style={label.style !== undefined ? label.style : {}}
        text={label.text}
      />
      {type === RowType.INPUT           ? createInput(input)                    : undefined}
      {type === RowType.DROP_DOWN       ? createDropDowns(dropDown)             : undefined}
      {type === RowType.IMAGE_SELECTION ? createImageSelection(imageSelection)  : undefined}
    </div>
  );
};

export default FormRowSingleInput;
