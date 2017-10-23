import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import Button from '../shared/html/button';
import * as Constants from '../../misc/constants';
import * as Event from './event';
import * as Key from '../../misc/key';
import * as Language from '../../misc/localization/language';
import * as Settings from '../../misc/settings';
import * as Strings from '../../misc/localization/strings';

const BTN_MENU_STYLE = {
  marginBottom: '20px'
};

const FIRST_BTN_STYLE = {
  marginLeft: Constants.ADMIN_MARGIN_LEFT
};

const SECOND_BTN_STYLE = {
  marginLeft: Constants.ADMIN_MENU_BUTTON_MARGIN
};

const createButton = (style, label, func, disabled, id, tooltip) => {
  if (Settings.get(Settings.DEBUG) !== true && Settings.get(Settings.KEY) === Key.getDefault()) {
    if (label !== 'Home' && label !== 'Get JSON' && label !== 'Reset') {
      disabled = true;
    }
  }
  return (
    <Button
      style={style}
      onClick={func !== undefined ? { func, id } : undefined}
      label={label}
      disabled={disabled}
      tooltip={tooltip}
    />
  );
};

const createButtonGlyph = (style, glyph, modal) => {
  return (
    <Button
      style={style}
      glyphicon={glyph}
      modal={modal}
    />
  );
};

const MenuButtonBar = ({onClick, deleteEnabled, deleteAllEnabled, lang}) => {
  return (
    <div style={{BTN_MENU_STYLE}}>
      <Link to={'/home'}>
        {createButton(FIRST_BTN_STYLE, 'Home')}
      </Link>
      {createButton(
        SECOND_BTN_STYLE,
        lang === Language.EN
          ? (<div><b>En</b> | Sv</div>)
          : (<div>En | <b>Sv</b></div>),
        onClick,
        false,
        Event.CHANGE_LANG,
        'Language only applies for store menu items.')}
      <ReactTooltip type='info' effect='solid' />
      {createButton(SECOND_BTN_STYLE, 'Save',         onClick, false,             Event.SAVE)}
      {createButton(SECOND_BTN_STYLE, 'New',          onClick, false,             Event.NEW)}
      {createButton(SECOND_BTN_STYLE, 'Copy',         onClick, false,             Event.COPY)}
      {createButton(SECOND_BTN_STYLE, 'Delete',       onClick, !deleteEnabled,    Event.DELETE)}
      {createButton(SECOND_BTN_STYLE, 'Delete All',   onClick, !deleteAllEnabled, Event.DELETE_ALL)}
      {createButton(SECOND_BTN_STYLE, 'Add Template', onClick, false,             Event.ADD_TEMPLATE)}
      {Settings.get(Settings.DEBUG) === true
        && createButton(SECOND_BTN_STYLE, 'Set Template', onClick, false, Event.SET_TEMPLATE)
      }
      <Link to='/json'>
        {createButton(SECOND_BTN_STYLE, 'Get JSON')}
      </Link>
      {createButton(SECOND_BTN_STYLE, 'Reset', onClick, false, Event.RESET)}
      {createButtonGlyph(SECOND_BTN_STYLE, 'info-sign', Constants.MODAL_ADMIN_INFO)}
    </div>
  );
};

export default MenuButtonBar;
