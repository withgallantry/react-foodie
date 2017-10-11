import React from 'react';
import Event from './event';
import Button from '../shared/html/button';
import { Link } from 'react-router-dom';
import Language from '../../util/localization/language';
import ReactTooltip from 'react-tooltip';
import { ADMIN_MARGIN_LEFT } from '../../util/constants';

const BTN_MENU_STYLE = {
  marginBottom: '20px'
};

const FIRST_BTN_STYLE = {
  marginLeft: ADMIN_MARGIN_LEFT
};

const SECOND_BTN_STYLE = {
  marginLeft: '10px'
};

const createButton = (style, label, func, disabled, id, tooltip) => {
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

const FormButtonBar = ({onClick, deleteEnabled, deleteAllEnabled, lang}) => {
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
        'Language only applies for the menu.')}
      <ReactTooltip type='info' effect='solid' />
      {createButton(SECOND_BTN_STYLE, 'Save',         onClick, false,             Event.SAVE)}
      {createButton(SECOND_BTN_STYLE, 'New',          onClick, false,             Event.NEW)}
      {createButton(SECOND_BTN_STYLE, 'Copy',         onClick, false,             Event.COPY)}
      {createButton(SECOND_BTN_STYLE, 'Delete',       onClick, !deleteEnabled,    Event.DELETE)}
      {createButton(SECOND_BTN_STYLE, 'Delete All',   onClick, !deleteAllEnabled, Event.DELETE_ALL)}
      {createButton(SECOND_BTN_STYLE, 'Add Template', onClick, false,             Event.ADD_TEMPLATE)}
      <Link to='/json'>
        {createButton(SECOND_BTN_STYLE, 'Get JSON')}
      </Link>
    </div>
  );
};

export default FormButtonBar;
