import React from 'react';

import Button from '../shared/html/button';
import { Link } from 'react-router-dom';
import * as Event from './event';
import * as Language from '../../util/localization/language';
import * as Settings from '../../util/settings';
import * as Strings from '../../util/localization/strings';

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
      {(() => {
        return Settings.get(Settings.DEBUG) &&
          <span>
            <Button
              style={BTN_STYLE}
              label={'Print Cookies'}
              onClick={{
                func : onClick,
                id : Event.PRINT_COOKIES
              }}
            />
            <Button
              style={BTN_STYLE}
              label={'Delete Cookies'}
              onClick={{
                func : onClick,
                id : Event.DELETE_COOKIES
              }}
            />
          </span>
      })()}
      <Link to={'/admin'}>
        <button
          className='btn btn-default'
          style={BTN_STYLE}>
          {Strings.get(Strings.EDITOR)}
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
