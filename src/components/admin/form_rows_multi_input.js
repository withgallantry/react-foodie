import React from 'react';
import _ from 'lodash';
import InputText from '../shared/html/input_text';
import Event from './event';
import { createButton } from './button_row';
import ReactTooltip from 'react-tooltip';
import { ADMIN_MARGIN_LEFT, ADMIN_LABEL_WIDTH, ADMIN_LABEL_MARGIN, ADMIN_FORM_ROW_MARGIN_TOP } from '../../util/constants';

const LABEL_STYLE = {
  display: 'inline-block',
  width: ADMIN_LABEL_WIDTH,
  textAlign: 'right',
  marginRight: ADMIN_LABEL_MARGIN
};

const FORM_ROW_STYLE = {
  marginTop: ADMIN_FORM_ROW_MARGIN_TOP,
  marginLeft: ADMIN_MARGIN_LEFT
};

const ITEM_INPUT_STYLE = {
  marginRight: '4px'
};

const BTN_NEW_MENU_STYLE = {
  marginLeft: ADMIN_MARGIN_LEFT,
  marginTop: '3px'
};

const BTN_STYLE = {
  marginRight: '6px'
};

const INPUT_MENU_NAME_SIZE = '35';
const INPUT_ITEM_DESC_SIZE = '100';
const INPUT_ITEM_NAME_SIZE = INPUT_MENU_NAME_SIZE;
const INPUT_ITEM_PRICE_SIZE = '4';

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

const FormRowsMultiInput = ({menu, index, onChange, onClick, lang}) => {
  let items = [];
  for (let i = 0; i < menu.items.length; ++i) {
    let item = menu.items[i];
    items.push((
      <div
        style={FORM_ROW_STYLE}
        className="block"
        key={`menu${index}.lang${lang}.item${i}`}>
        {createButton('trash',          onClick, Event.REMOVE_MENU_ITEM,    [index, i], BTN_STYLE)}
        {createButton('arrow-up',       onClick, Event.MOVE_MENU_ITEM_UP,   [index, i], BTN_STYLE)}
        {createButton('arrow-down',     onClick, Event.MOVE_MENU_ITEM_DOWN, [index, i], BTN_STYLE)}
        {createButton('cloud-download', onClick, Event.CLONE,               [index, i], BTN_STYLE, 'Fetch description from different language.')}
        <ReactTooltip type='info' effect='solid' />
        {createInputText(ITEM_INPUT_STYLE, INPUT_ITEM_NAME_SIZE,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'name',  lang], item.name)}
        {createInputText(ITEM_INPUT_STYLE, INPUT_ITEM_DESC_SIZE,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'desc',  lang], item.desc)}
        {createInputText(ITEM_INPUT_STYLE, INPUT_ITEM_PRICE_SIZE, onChange, [Event.CHANGE_MENU_ITEM, index, i, 'price', lang], item.price)}
      </div>
    ));
  }

  return (
    <div>
      <label
        style={LABEL_STYLE}>
        {`menu${index + 1}`}:
      </label>
      {createButton('trash',          onClick, Event.REMOVE_MENU,    [index], BTN_STYLE)}
      {createButton('arrow-up',       onClick, Event.MOVE_MENU_UP,   [index], BTN_STYLE)}
      {createButton('arrow-down',     onClick, Event.MOVE_MENU_DOWN, [index], BTN_STYLE)}
      {createButton('cloud-download', onClick, Event.CLONE,          [index], BTN_STYLE, 'Fetch description from different language.')}
      <ReactTooltip type='info' effect='solid' />
      {createInputText({}, INPUT_MENU_NAME_SIZE, onChange, [Event.CHANGE_MENU_NAME, index, lang], menu.name)}
      {
        _.forEach(items, (item) => {
          return item;
        })
      }
      <div>
        {createButton('plus', onClick, Event.NEW_MENU_ITEM, [index, lang], BTN_NEW_MENU_STYLE)}
      </div>
    </div>
  );
};

export default FormRowsMultiInput;
