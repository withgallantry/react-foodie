import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import Button from '../../shared/html/button';
import * as Constants from '../../../misc/constants';
import * as Debug from '../../../misc/debug';
import * as Event from './../event';
import * as Language from '../../../misc/localization/language';
import * as Settings from '../../../misc/settings';
import * as Strings from '../../../misc/localization/strings';

const DIV_STYLE = {
  position: 'absolute',
  top: '32px',
  right: '40px',
};

const BTN_STYLE = {
  marginRight: '5px'
};

const CART_STYLE = {
  marginRight: '5px',
  paddingLeft: '15px',
  paddingRight: '15px',
}

const createCartButton = () => {
  return (
    <span>
      <Button
        style={CART_STYLE}
        glyphicon={'shopping-cart'}
        tooltip={Strings.get(Strings.GO_TO_ORDER)}
      />
      <ReactTooltip type='info' effect='solid' />
    </span>
  );
};

const NavBar = ({onClick, language, storeId}) => {
  return (
    <div style={DIV_STYLE}>
      {<span>
        {Debug.createButton('Print Cookies',  () => Debug.logCookies(),    BTN_STYLE)}
        {Debug.createButton('Delete Cookies', () => Debug.deleteCookies(), BTN_STYLE)}
      </span>
      }
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
        glyphicon='info-sign'
        modal={Constants.MODAL_INFO}
      />
      {storeId !== undefined
        ?
          <span>
            <Link to={`/store/${storeId}`}>
              {createCartButton()}
            </Link>
          </span>
        :
          <span>
            {createCartButton()}
          </span>
      }
    </div>
  );
};

export default NavBar;
