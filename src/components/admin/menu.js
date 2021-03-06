import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';

import Button from '../shared/html/button';
import DropDown from '../shared/html/drop_down';
import InputText from '../shared/html/input_text';
import MenuButtonBar from './menu_button_bar';
import * as Constants from '../../misc/constants';
import * as Event from './event';
import * as Language from '../../misc/localization/language';

const div = {
  height: Constants.ADMIN_MENU_HEIGHT
};

const divDropDown = {
  marginLeft: Constants.ADMIN_MARGIN_LEFT,
  marginTop: '16px',
  marginBottom: '10px',
};

const inputSearchStore = {
  marginLeft: Constants.ADMIN_MARGIN_LEFT,
  marginBottom: '10px'
};

const inputSearchKey = {
  marginLeft: Constants.ADMIN_MENU_BUTTON_MARGIN,
  marginBottom: '10px',
  marginRight: '2px'
};

const searchStoreSize = '32';
const searchKeySize = '20';

const Menu = ({
  error, onClick, onChangeSearch, onChangeKey, stores,
  deleteEnabled, deleteAllEnabled, _key, lang}) =>
{
  if (stores == null) {
    return (
      <div>
        Loading stores...
      </div>
    );
  }

  const rows = _.map(stores, (store) => {
    return {
      value : store.name,
      args : store.id
    };
  });

  rows.sort((a, b) => {
    return a.value.localeCompare(b.value) > 0;
  });

  return (
    <div style={div}>
      <DropDown
        style={divDropDown}
        classes='btn-primary'
        rows={rows}
        onClick={{
          func : onClick,
          id : Event.SHOW,
        }}
        title={`Select Store (${rows.length})`}
        href='#/admin'
      />
      <InputText
        size={searchStoreSize}
        style={inputSearchStore}
        placeholder={'Search for restaurant name...'}
        onChange={{ func : onChangeSearch }}
      />
      <InputText
        dataTip={'Unique identifier for a set of stores. Change the default key'
          + ' to create a new empty set which you then can modify as you like.'}
        size={searchKeySize}
        style={inputSearchKey}
        placeholder={_key}
        onChange={{ func : onChangeKey }}
      />
      <ReactTooltip type="info" effect="solid"/>
      &#9911;
      <MenuButtonBar
        error={error}
        onClick={onClick}
        deleteEnabled={deleteEnabled}
        deleteAllEnabled={deleteAllEnabled}
        lang={lang}
      />
    </div>
  );
};

Menu.propTypes = {
  error: PropTypes.bool,
  onClick: PropTypes.func,
  onChangeSearch: PropTypes.func,
  onChangeKey: PropTypes.func,
  stores : PropTypes.array,
  deleteEnabled: PropTypes.bool,
  deleteAllEnabled: PropTypes.bool,
  _key: PropTypes.string,
  lang: PropTypes.oneOf(Language.get()),
};

export default Menu;
