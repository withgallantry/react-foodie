import React from 'react';
import _ from 'lodash';
import InputText from '../html/input_text';
import Event from './event';
import { createButton } from './button_row';

const labelStyle = {
  display: 'inline-block',
  width: '140px',
  textAlign: 'right',
  marginRight: '20px'
};

const formRowStyle = {
  marginTop: '2px',
  marginLeft: '160px'
};

const itemInputStyle = {
  marginRight: '4px'
};

const btnNewMenuStyle = {
  marginLeft: '160px',
  marginTop: '3px'
};

const inputMenuNameSize = '35';
const inputItemDescSize = '100';
const inputItemNameSize = inputMenuNameSize;
const inputItemPriceSize = '4';

const createInputText = (style, size, onChange, args, value) => {
  return (
    <InputText
      style={style}
      size={size}
      onChange={{ func : onChange, args }}
      value={value}
    />
  );
};

const btnStyle = {
  marginRight: '6px'
};

const FormRowMultiLine = ({menu, index, onChange, onClick}) => {
  var items = [];
  for (var i = 0; i < menu.items.length; ++i) {
      var item = menu.items[i];
      items.push((
        <div
          style={formRowStyle}
          className="block"
          key={`menu${index}.item${i}`}>
          {createButton('trash',      onClick, Event.REMOVE_MENU_ITEM,    [index, i], btnStyle)}
          {createButton('arrow-up',   onClick, Event.MOVE_MENU_ITEM_UP,   [index, i], btnStyle)}
          {createButton('arrow-down', onClick, Event.MOVE_MENU_ITEM_DOWN, [index, i], btnStyle)}
          {createInputText(itemInputStyle, inputItemNameSize,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'name'],  item.name)}
          {createInputText(itemInputStyle, inputItemDescSize,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'desc'],  item.desc)}
          {createInputText(itemInputStyle, inputItemPriceSize, onChange, [Event.CHANGE_MENU_ITEM, index, i, 'price'], item.price)}
        </div>
      ));
  }

  return (
    <div>
      <label
        style={labelStyle}>
        {`menu${index + 1}`}:
      </label>
      {createButton('trash',      onClick, Event.REMOVE_MENU,    [index], btnStyle)}
      {createButton('arrow-up',   onClick, Event.MOVE_MENU_UP,   [index], btnStyle)}
      {createButton('arrow-down', onClick, Event.MOVE_MENU_DOWN, [index], btnStyle)}
      {createInputText({}, inputMenuNameSize, onChange, [Event.CHANGE_MENU_NAME, index], menu.name)}
      {
        _.forEach(items, (item) => {
          return item;
        })
      }
      <div>
        {createButton('plus', onClick, Event.NEW_MENU_ITEM, [index], btnNewMenuStyle)}
      </div>
    </div>
  );
};

export default FormRowMultiLine;
