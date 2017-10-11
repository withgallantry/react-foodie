import React, { Component } from 'react';
import _ from 'lodash';
import Button from '../shared/html/button';
import ReactTooltip from 'react-tooltip';
import FormButtonBar from './form_button_bar';
import InputText from '../shared/html/input_text';
import Event from './event';
import DropDown from '../shared/html/drop_down';

const SELECT_STYLE = {
  height: '118px'
};

const DROP_DOWN_STYLE = {
  marginLeft: '160px',
  marginTop: '20px',
  marginBottom: '10px',
  paddingTop: '5px'
};

const SEARCH_STORE_STYLE = {
  marginLeft: '160px',
  marginBottom: '10px'
};

const SEARCH_KEY_STYLE = {
  marginLeft: '20px',
  marginBottom: '10px',
  marginRight: '2px'
};

const SEARCH_STORE_SIZE = '32';
const SEARCH_KEY_SIZE = '20';

const Menu = ({onClick, onChangeSearch, onChangeKey, foodPlaces, deleteEnabled, deleteAllEnabled, _key, lang}) => {
  if (foodPlaces == null) {
    return (
      <div>
        Loading food places...
      </div>
    );
  }

  let rows = _.map(foodPlaces, (foodPlace) => {
    return {
      value : foodPlace.name,
      args : [foodPlace.id]
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
      {/* Search bars */}
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
      <FormButtonBar
        onClick={onClick}
        deleteEnabled={deleteEnabled}
        deleteAllEnabled={deleteAllEnabled}
        lang={lang}
      />
    </div>
  );
};

export default Menu;
