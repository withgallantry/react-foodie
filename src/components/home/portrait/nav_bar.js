import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import Button from '../../shared/html/button';
import * as Constants from '../../../misc/constants';
import * as Event from './../event';
import * as Language from '../../../misc/localization/language';
import * as Settings from '../../../misc/settings';
import * as Strings from '../../../misc/localization/strings';

const div = {
  textAlign: 'center',
  marginTop: '10px'
};

const btnStyle = {
  marginRight: '5px',
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '15px',
  paddingRight: '15px',
  display: 'inline-block',
};

const cartStyle = {
  marginRight: '5px',
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '10px',
  paddingBottom: '10px',
  display: 'inline-block',
}

const createCartButton = () => {
  return (
    <Button
      style={cartStyle}
      glyphicon={'shopping-cart'}
    />
  );
};

const NavBar = ({onClick, language, storeId}) => {
  return (
    <div style={div}>
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
      {
        storeId !== undefined
        ? <Link to={`/store/${storeId}`}>
            {createCartButton()}
          </Link>
        : createCartButton()
      }
    </div>
  );
};

export default NavBar;
