import React from 'react';
import Button from '../shared/html/button';
import Language from '../../util/localization/language';
import Event from './event';
import { Link } from 'react-router-dom';
import Strings, { getString } from '../../util/localization/strings';

const DIV_STYLE = {
  position: 'absolute',
  top: '32px',
  right: '40px',
};

const BTN_STYLE = {
  marginRight: '5px'
};

const NavBar = ({onClick, language, itemCount}) => {
  return (
    <div style={DIV_STYLE}>
      <Link to={'/admin'}>
        <button
          className='btn btn-default'
          style={BTN_STYLE}>
          {getString(Strings.EDITOR)}
        </button>
      </Link>
      <Button
        style={BTN_STYLE}
        label={language === Language.EN
          ? (<div><b>En</b> | Sv</div>)
          : (<div>En | <b>Sv</b></div>)}
        onClick={{
          func : onClick,
          id : Event.CHANGE_LANGUAGE
        }}
      />
      <Button
        style={BTN_STYLE}
        glyphicon={'shopping-cart'}
        label={` (${itemCount})`}
      />
    </div>
  );
};

export default NavBar;
