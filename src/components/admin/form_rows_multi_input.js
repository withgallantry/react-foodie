import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import InputText from '../shared/html/input_text';
import * as Constants from '../../misc/constants';
import * as Event from './event';
import * as Language from '../../misc/localization/language';
import * as MenuButton from './menu_button';

const label = {
  display: 'inline-block',
  width: Constants.ADMIN_LABEL_WIDTH,
  textAlign: 'right',
  marginRight: Constants.ADMIN_LABEL_MARGIN
};

const div = {
  marginTop: Constants.ADMIN_FORM_ROW_MARGIN_TOP,
  marginLeft: Constants.ADMIN_MARGIN_LEFT
};

const input = {
  marginRight: '4px'
};

const btnNewMenu = {
  marginLeft: Constants.ADMIN_MARGIN_LEFT,
  marginTop: '3px'
};

const btn = {
  marginRight: '6px'
};

const INPUT_MENU_NAME_SIZE = '35';
const INPUT_ITEM_DESC_SIZE = '100';
const INPUT_ITEM_NAME_SIZE = INPUT_MENU_NAME_SIZE;
const INPUT_ITEM_PRICE_SIZE = '1';

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
    const item = menu.items[i];
    items.push((
      <div
        style={div}
        className="block"
        key={`menu${index}.lang${lang}.item${i}`}>
        {MenuButton.create('trash',          onClick, Event.REMOVE_MENU_ITEM,    [index, i], btn)}
        {MenuButton.create('arrow-up',       onClick, Event.MOVE_MENU_ITEM_UP,   [index, i], btn)}
        {MenuButton.create('arrow-down',     onClick, Event.MOVE_MENU_ITEM_DOWN, [index, i], btn)}
        {MenuButton.create('duplicate', onClick, Event.CLONE,               [index, i], btn, 'Fetch description from different language.')}
        <ReactTooltip type='info' effect='solid' />
        {createInputText(input, INPUT_ITEM_NAME_SIZE,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'name',  lang], item.name)}
        {createInputText(input, INPUT_ITEM_DESC_SIZE,  onChange, [Event.CHANGE_MENU_ITEM, index, i, 'desc',  lang], item.desc)}
        {createInputText(input, INPUT_ITEM_PRICE_SIZE, onChange, [Event.CHANGE_MENU_ITEM, index, i, 'price', lang], item.price)}
        {Constants.CURRENCY}
      </div>
    ));
  }

  return (
    <div>
      <label
        style={label}>
        {`menu${index + 1}`}:
      </label>
      {MenuButton.create('trash',          onClick, Event.REMOVE_MENU,    [index], btn)}
      {MenuButton.create('arrow-up',       onClick, Event.MOVE_MENU_UP,   [index], btn)}
      {MenuButton.create('arrow-down',     onClick, Event.MOVE_MENU_DOWN, [index], btn)}
      {MenuButton.create('duplicate',      onClick, Event.CLONE,          [index], btn, 'Fetch description from different language.')}
      <ReactTooltip type='info' effect='solid' />
      {createInputText({}, INPUT_MENU_NAME_SIZE, onChange, [Event.CHANGE_MENU_NAME, index, lang], menu.name)}
      {items}
      <div>
        {MenuButton.create('plus', onClick, Event.NEW_MENU_ITEM, [index, lang], btnNewMenu)}
      </div>
    </div>
  );
};

FormRowsMultiInput.propTypes = {
  menu: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.string,
    })),
    name: PropTypes.string,
  }),
  index: PropTypes.number,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  lang: PropTypes.oneOf(Language.get()),
};

export default FormRowsMultiInput;
