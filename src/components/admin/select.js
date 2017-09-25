import React, { Component } from 'react';
import _ from 'lodash';
import { Event } from './admin';

const dropDownStyle = {
  marginLeft: '160px',
  marginTop: '20px',
  marginBottom: '10px'
};

const searchStyle = {
  marginLeft: '160px',
  marginBottom: '10px'
};

const buttonStyle = {
  marginLeft: '10px'
};

const Select = ({onClick, onChange, foodPlaces}) => {
  if (foodPlaces === null) {
    return (
      <div style={style}>
        Loading food places...
      </div>
    );
  }

  var items = _.map(foodPlaces, (foodPlace) => {
    return (
      <li onClick={() => onClick(Event.SHOW, foodPlace.id)} key={foodPlace.id}>
        <a href='#'>{`${foodPlace.name} (${foodPlace.lang})`}</a>
      </li>
    );
  });

  items = _.orderBy(items, (item) => {
    return item.name;
  });

  return (
    <div>
      <div style={dropDownStyle} className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-toggle="dropdown">
          Food places &nbsp;
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu">
          {/*<li onClick={() => onClick(Event.NEW)}>
            <a href='#'>--- New ---</a>
          </li>*/}
          {items}
        </ul>
        <button
          style={buttonStyle}
          type="button"
          className="btn btn-default"
          onClick={() => onClick(Event.ADD_TEMPLATE)}>
          Add Template
        </button>
      </div>
      <input
        style={searchStyle}
        type="text"
        size='32'
        placeholder="Search for restaurant name..."
        onChange={(event) => onChange(event.target.value)}>
      </input>
    </div>
  );
};

export default Select;
