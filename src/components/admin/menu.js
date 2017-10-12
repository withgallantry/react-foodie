import React, { Component } from 'react';
import _ from 'lodash';
import Button from '../shared/html/button';
import ReactTooltip from 'react-tooltip';
import MenuButtonBar from './menu_button_bar';
import InputText from '../shared/html/input_text';
import Event from './event';
import DropDown from '../shared/html/drop_down';
import { ADMIN_MARGIN_LEFT, ADMIN_MENU_HEIGHT, ADMIN_SECTION_MARGIN_HEIGHT, ADMIN_MENU_BUTTON_MARGIN} from '../../util/constants';

const SELECT_STYLE = {
  height: ADMIN_MENU_HEIGHT
};

const DROP_DOWN_STYLE = {
  marginLeft: ADMIN_MARGIN_LEFT,
  marginTop: '16px',
  marginBottom: '10px',
};

const SEARCH_STORE_STYLE = {
  marginLeft: ADMIN_MARGIN_LEFT,
  marginBottom: '10px'
};

const SEARCH_KEY_STYLE = {
  marginLeft: ADMIN_MENU_BUTTON_MARGIN,
  marginBottom: '10px',
  marginRight: '2px'
};

const SEARCH_STORE_SIZE = '32';
const SEARCH_KEY_SIZE = '20';

const Menu = ({onClick, onChangeSearch, onChangeKey, stores, deleteEnabled, deleteAllEnabled, _key, lang}) => {
  if (stores == null) {
    return (
      <div>
        Loading stores...
      </div>
    );
  }

  let rows = _.map(stores, (store) => {
    return {
      value : store.name,
      args : store.id
    };
  });

  rows.sort((a, b) => {
    return a.value.localeCompare(b.key) > 0;
  });

  return (
    <div style={SELECT_STYLE}>
      <DropDown
        style={DROP_DOWN_STYLE}
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
        size={SEARCH_STORE_SIZE}
        style={SEARCH_STORE_STYLE}
        placeholder={'Search for restaurant name...'}
        onChange={{ func : onChangeSearch }}
      />
      <InputText
        dataTip='Unique identifier for a set of stores.'
        size={SEARCH_KEY_SIZE}
        style={SEARCH_KEY_STYLE}
        placeholder={_key}
        onChange={{ func : onChangeKey }}
      />
      <ReactTooltip type="info" effect="solid"/>
      &#9911;
      <MenuButtonBar
        onClick={onClick}
        deleteEnabled={deleteEnabled}
        deleteAllEnabled={deleteAllEnabled}
        lang={lang}
      />
    </div>
  );
};

export default Menu;
