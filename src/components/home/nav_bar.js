import React from 'react';
import Button from '../util/html/button';
import Language from '../util/localization/language';
import Event from './event';
import Config, { getConfig } from '../util/config';
import { Link } from 'react-router-dom';

const divStyle = {
  position: 'absolute',
  top: '32px',
  right: '40px',
};

const btnStyle = {
  marginRight: '5px'
};

const NavBar = ({onClick, language, itemCount}) => {
  return (
    <div style={divStyle}>
      {getConfig(Config.DEBUG) === true
        ? <Link to={'/admin'}>
            <button
              className='btn btn-default'
              style={btnStyle}>
              Admin
            </button>
          </Link>
        : void(0)}
      <Button
        style={btnStyle}
        label={language === Language.EN
          ? (<div><b>En</b> | Sv</div>)
          : (<div>En | <b>Sv</b></div>)}
        onClick={{
          func : onClick,
          id : Event.CHANGE_LANGUAGE
        }}
      />
      <Button
        style={btnStyle}
        glyphicon={'shopping-cart'}
        label={` (${itemCount})`}
      />
    </div>
  );
};

export default NavBar;
