import React from 'react';
import PropTypes from 'prop-types';

import AddressSearchBar from '../shared/address_search_bar';
import Button from '../shared/html/button';
import DropDown from '../shared/html/drop_down';
import InputText from '../shared/html/input_text';
import Label from '../shared/html/label';
import * as Constants from '../../misc/constants';
import * as Event from './event';
import * as RowType from './row_type';

const btn = {
  display: 'inline',
  padding: '1px',
};

const width = 400;
const img = {
  maxWidth: `${width}px`,
  maxHeight: `${width * Constants.BANNER_RATIO}px`,
};

const inline = {
  display : 'inline',
};

const createSearchBar = ({onChange, placeholder}) => {
  return (
    <AddressSearchBar
      onAddressChange={onChange}
      placeholder={placeholder}/>
  );
};

const createImageSelection = ({value, label}) => {
  const id = label.includes('gallery')
    ? Event.SET_IMAGE_GALLERY
    : Event.SET_IMAGE_BANNER;
  const _value = label.includes('gallery')
    ? 'gallery0.png'
    : 'banner0.png';
  if (value !== undefined && value.length > 0) {
    return (
      <Button
        style={btn}
        modal={`${Constants.MODAL_IMAGE}${id}`}
        image={{ style : img, src : `img/${_value}` }}
      />
    );
  }
  return (<div style={inline}></div>);
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
          style={inline}>
          &nbsp;:&nbsp;
          </div>
      );
    }
  }

  return (
    <div style={inline}>
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

const FormRowSingleInput = ({div, label, input, type, dropDown, imageSelection, searchBar}) => {
  let element;
  if      (type === RowType.INPUT)            { element = createInput(input);                   }
  else if (type === RowType.DROP_DOWN)        { element = createDropDowns(dropDown);            }
  else if (type === RowType.IMAGE_SELECTION)  { element = createImageSelection(imageSelection); }
  else if (type === RowType.SEARCH_BAR)       { element = createSearchBar(searchBar);           }

  return (
    <div
      style={div.style !== undefined ? div.style : {}}
      className={div.classes !== undefined ? div.classes : 'block'}>
      <Label
        style={label.style !== undefined ? label.style : {}}
        text={label.text}
      />
      {element}
    </div>
  );
};

FormRowSingleInput.propTypes = {
  div: PropTypes.shape({
    style: PropTypes.object,
    classes: PropTypes.class,
  }),
  label: PropTypes.shape({
    style: PropTypes.object,
    text: PropTypes.string,
  }),
  input: PropTypes.shape({
    style: PropTypes.object,
    size: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.shape({
      func: PropTypes.func,
      args: PropTypes.array,
    }),
  }),
  type: PropTypes.oneOf(RowType.get()),
  dropDown: PropTypes.shape({
    ids: PropTypes.array,
    href: PropTypes.string,
    onClick: PropTypes.func,
    ids: PropTypes.array,
    rows: PropTypes.array,
    selected: PropTypes.array,
    style: PropTypes.object,
  }),
  imageSelection: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  searchBar: PropTypes.shape({
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
  }),
};

export default FormRowSingleInput;
