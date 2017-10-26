import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import Button from '../shared/html/button';
import * as Constants from '../../misc/constants';
import * as Debug from '../../misc/debug';
import * as Event from './event';
import * as Key from '../../misc/key';
import * as Language from '../../misc/localization/language';
import * as Settings from '../../misc/settings';
import * as Strings from '../../misc/localization/strings';

const div = {
  marginBottom: '20px'
};

const btnFirst = {
  marginLeft: Constants.ADMIN_MARGIN_LEFT
};

const btn = {
  marginLeft: Constants.ADMIN_MENU_BUTTON_MARGIN
};

const createButton = (error, style, label, func, disabled, id, tooltip) => {
  if (Settings.get(Settings.KEY) === Key.getDefault()) {
    if (label !== 'Home' && label !== 'Get JSON' && label !== 'Reset') {
      disabled = true;
    }
  }
  if (error && label !== 'Home') {
    disabled = true;
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

const MenuButtonBar = ({error, onClick, deleteEnabled, deleteAllEnabled, lang}) => {
  return (
    <div style={div}>
      <Link to={'/home'}>
        {createButton(error, btnFirst, 'Home')}
      </Link>
      {createButton(
        error,
        btn,
        lang === Language.EN
          ? (<div><b>En</b> | Sv</div>)
          : (<div>En | <b>Sv</b></div>),
        onClick,
        false,
        Event.CHANGE_LANG,
        'Language only applies for store menu items.')}
      <ReactTooltip type='info' effect='solid' />
      {createButton(error, btn, 'Save',         onClick, false,             Event.SAVE)}
      {createButton(error, btn, 'New',          onClick, false,             Event.NEW)}
      {createButton(error, btn, 'Copy',         onClick, false,             Event.COPY)}
      {createButton(error, btn, 'Delete',       onClick, !deleteEnabled,    Event.DELETE)}
      {createButton(error, btn, 'Delete All',   onClick, !deleteAllEnabled, Event.DELETE_ALL)}
      {createButton(error, btn, 'Add Template', onClick, false,             Event.ADD_TEMPLATE)}
      {Debug.createButton('Set Template', onClick, btn, Event.SET_TEMPLATE)}
      <Link to='/json'>
        {createButton(error, btn, 'Get JSON')}
      </Link>
      {createButton(error, btn, 'Reset', onClick, false, Event.RESET)}
      {createButtonGlyph(btn, 'info-sign', Constants.MODAL_ADMIN_INFO)}
    </div>
  );
};

MenuButtonBar.propTypes = {
  error: PropTypes.bool,
  onClick: PropTypes.func,
  deleteEnabled: PropTypes.bool,
  deleteAllEnabled: PropTypes.bool,
  lang: PropTypes.oneOf(Language.get()),
};

export default MenuButtonBar;
