import React from 'react';
import _ from 'lodash';
import InputText from '../html/input_text';
import Event from './event';
import { createButton } from './button_row';
import ReactTooltip from 'react-tooltip';

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

const createInputText = (style, size, onChange, args, value, lang) => {
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

const FormRowsMultiInput = ({menu, index, onChange, onClick, lang}) => {
  let items = [];
  for (var i = 0; i < menu.items.length; ++i) {
    let item = menu.items[i];
    items.push((
      <div
        style={formRowStyle}
        className="block"
        key={`menu${index}.lang${lang}.item${i}`}>
        {createButton('trash',          onClick, Event.REMOVE_MENU_ITEM,    [index, i], btnStyle)}
        {createButton('arrow-up',       onClick, Event.MOVE_MENU_ITEM_UP,   [index, i], btnStyle)}
        {createButton('arrow-down',     onClick, Event.MOVE_MENU_ITEM_DOWN, [index, i], btnStyle)}
        {createButton('cloud-download', onClick, Event.CLONE,               [index, i], btnStyle, 'Fetch description from different language.')}
        <ReactTooltip type='info' effect='solid' />
        {createInputText(itemInputStyle, inputItemNameSize,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'name',  lang], item.name)}
        {createInputText(itemInputStyle, inputItemDescSize,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'desc',  lang], item.desc)}
        {createInputText(itemInputStyle, inputItemPriceSize, onChange, [Event.CHANGE_MENU_ITEM, index, i, 'price', lang], item.price)}
      </div>
    ));
  }

  return (
    <div>
      <label
        style={labelStyle}>
        {`menu${index + 1}`}:
      </label>
      {createButton('trash',          onClick, Event.REMOVE_MENU,    [index], btnStyle)}
      {createButton('arrow-up',       onClick, Event.MOVE_MENU_UP,   [index], btnStyle)}
      {createButton('arrow-down',     onClick, Event.MOVE_MENU_DOWN, [index], btnStyle)}
      {createButton('cloud-download', onClick, Event.CLONE,          [index], btnStyle, 'Fetch description from different language.')}
      <ReactTooltip type='info' effect='solid' />
      {createInputText({}, inputMenuNameSize, onChange, [Event.CHANGE_MENU_NAME, index, lang], menu.name)}
      {
        _.forEach(items, (item) => {
          return item;
        })
      }
      <div>
        {createButton('plus', onClick, Event.NEW_MENU_ITEM, [index, lang], btnNewMenuStyle)}
      </div>
    </div>
  );
};

export default FormRowsMultiInput;