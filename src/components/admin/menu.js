import React, { Component } from 'react';
import _ from 'lodash';
import Button from '../util/html/button';
import FormCrud from './form_crud';
import InputText from '../util/html/input_text';
import Event from './event';
import Config, { getConfig } from '../util/config';
import { Link } from 'react-router-dom';

const selectStyle = {
  height: '118px'
};

const dropDownStyle = {
  marginLeft: '160px',
  marginTop: '20px',
  marginBottom: '10px',
  paddingTop: '5px'
};

const searchStyle = {
  marginLeft: '160px',
  marginBottom: '10px'
};

const buttonStyle = {
  marginLeft: '10px'
};

const searchSize = '32';

const Menu = ({onClick, onChange, foodPlaces, deleteEnabled}) => {
  if (foodPlaces == null) {
    return (
      <div>
        Loading food places...
      </div>
    );
  }

  var items = _.map(foodPlaces, (foodPlace) => {
    return (
      <li onClick={() => onClick(Event.SHOW, [foodPlace.id])} key={foodPlace.id}>
        <a href='#'>{`${foodPlace.name} (${foodPlace.lang})`}</a>
      </li>
    );
  });

  items = _.orderBy(items, (item) => {
    return item.name;
  });

  return (
    <div style={selectStyle}>
      {getConfig(Config.DEBUG) === true
        ? <Link to={'/home'}>
            <button
              className='btn btn-default'
              style={{
                position: 'absolute',
                left: '40px',
                top: '24px',
              }}>
              Home
            </button>
          </Link>
        : void(0)}
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
        <Button
          style={buttonStyle}
          label='Add Template'
          onClick={{ func : onClick, id : Event.ADD_TEMPLATE }}
        />
      </div>
      <InputText
        size={searchSize}
        style={searchStyle}
        placeholder={'Search for restaurant name...'}
        onChange={{ func : onChange }}
      />
      <FormCrud
        onClick={onClick}
        deleteEnabled={deleteEnabled}
      />
    </div>
  );
};

export default Menu;
