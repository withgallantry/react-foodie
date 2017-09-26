import React from 'react';
import _ from 'lodash';
import InputText from '../util/input_text';
import { Event } from './admin';
import Button from '../util/button';
import ButtonAddMenuItem from './button_add_menu_item';
import ButtonRemoveMenuItem from './button_remove_menu_item';

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

const btnStyle = {
  marginRight: '12px'
};

const btnNewItemStyle = {
  marginLeft: '160px',
  marginTop: '2px'
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

const FormRowMultiLine = ({menu, index, onChange, onClick}) => {
  var items = [];
  for (var i = 0; i < menu.items.length; ++i) {
      var item = menu.items[i];
      items.push((
        <div
          style={formRowStyle}
          className="block"
          key={`menu${index}.item${i}`}>
          <ButtonRemoveMenuItem
            onClick={onClick}
            menu={index}
            item={i}
          />
          {createInputText(itemInputStyle, inputItemNameSize,  onChange, [Event.MENU_CHANGE_ITEM, index, i, 'name'],  item.name)}
          {createInputText(itemInputStyle, inputItemDescSize,  onChange, [Event.MENU_CHANGE_ITEM, index, i, 'desc'],  item.desc)}
          {createInputText(itemInputStyle, inputItemPriceSize, onChange, [Event.MENU_CHANGE_ITEM, index, i, 'price'], item.price)}
        </div>
      ));
  }

  return (
    <div>
      <label
        style={labelStyle}>
        {`menu${index + 1}`}:
      </label>
      <button
        style={btnStyle}
        type="button"
        onClick={() => onClick(Event.REMOVE_MENU, index)}>
        <span className='glyphicon glyphicon-trash'></span>
      </button>
      {createInputText({}, inputMenuNameSize, onChange, [Event.MENU_CHANGE_NAME, index], menu.name)}
      {
        _.forEach(items, (item) => {
          return item;
        })
      }
      <div>
        <ButtonAddMenuItem
          onClick={onClick}
          index={index}
        />
      </div>
    </div>
  );
};

export default FormRowMultiLine;
