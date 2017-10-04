import React, { Component } from 'react';
import _ from 'lodash';
import Button from '../html/button';
import ReactTooltip from 'react-tooltip';
import FormButtonBar from './form_button_bar';
import InputText from '../html/input_text';
import Event from './event';

const selectStyle = {
  height: '118px'
};

const dropDownStyle = {
  marginLeft: '160px',
  marginTop: '20px',
  marginBottom: '10px',
  paddingTop: '5px'
};

const searchStoreStyle = {
  marginLeft: '160px',
  marginBottom: '10px'
};

const searchKeyStyle = {
  marginLeft: '20px',
  marginBottom: '10px',
  marginRight: '2px'
};

const searchStoreSize = '32';
const searchKeySize = '20';

const Menu = ({onClick, onChangeSearch, onChangeKey, foodPlaces, deleteEnabled, deleteAllEnabled, _key}) => {
  if (foodPlaces == null) {
    return (
      <div>
        Loading food places...
      </div>
    );
  }

  let items = _.map(foodPlaces, (foodPlace) => {
    return (
      <li onClick={() => onClick(Event.SHOW, [foodPlace.id])} key={`${foodPlace.name}${foodPlace.id}`}>
        <a href='#/admin'>{`${foodPlace.name} (${foodPlace.lang})`}</a>
      </li>
    );
  });

  items.sort((a, b) => {
    return a.key.localeCompare(b.key) > 0;
  });

  return (
    <div style={selectStyle}>
      <div style={dropDownStyle} className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown">
          Food places ({items.length}) &nbsp;
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {items}
        </ul>
      </div>
      {/* Search bars */}
      <InputText
        size={searchStoreSize}
        style={searchStoreStyle}
        placeholder={'Search for restaurant name...'}
        onChange={{ func : onChangeSearch }}
      />
      <InputText
        dataTip='Unique identifier for a set of stores.'
        size={searchKeySize}
        style={searchKeyStyle}
        placeholder={_key}
        onChange={{ func : onChangeKey }}
      />
      <ReactTooltip type="warning" effect="solid"/>
      &#9911;
      <FormButtonBar
        onClick={onClick}
        deleteEnabled={deleteEnabled}
        deleteAllEnabled={deleteAllEnabled}
      />
    </div>
  );
};

export default Menu;
