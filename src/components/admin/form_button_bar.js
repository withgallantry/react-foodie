import React from 'react';
import Event from './event';
import Button from '../html/button';
import { Link } from 'react-router-dom';
import Language from '../../util/localization/language';
import ReactTooltip from 'react-tooltip';

const btnMenuStyle = {
  marginBottom: '20px'
};

const firstBtnStyle = {
  marginLeft: '160px'
};

const secondBtnStyle = {
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
    <div style={{btnMenuStyle}}>
      <Link to={'/home'}>
        {createButton(firstBtnStyle, 'Home')}
      </Link>
      {createButton(
        secondBtnStyle,
        lang === Language.EN
          ? (<div><b>En</b> | Sv</div>)
          : (<div>En | <b>Sv</b></div>),
        onClick,
        false,
        Event.CHANGE_LANG,
        'Language only applies for the menu.')}
      <ReactTooltip type='info' effect='solid' />
      {createButton(secondBtnStyle, 'Save',         onClick, false,             Event.SAVE)}
      {createButton(secondBtnStyle, 'New',          onClick, false,             Event.NEW)}
      {createButton(secondBtnStyle, 'Copy',         onClick, false,             Event.COPY)}
      {createButton(secondBtnStyle, 'Delete',       onClick, !deleteEnabled,    Event.DELETE)}
      {createButton(secondBtnStyle, 'Delete All',   onClick, !deleteAllEnabled, Event.DELETE_ALL)}
      {createButton(secondBtnStyle, 'Add Template', onClick, false,             Event.ADD_TEMPLATE)}
      <Link to='/json'>
        {createButton(secondBtnStyle, 'Get JSON')}
      </Link>
    </div>
  );
};

export default FormButtonBar;
