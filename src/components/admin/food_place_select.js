import React, { Component } from 'react';
import _ from 'lodash';
import { Event } from './admin';

const style = {
  marginLeft: '160px',
  marginTop: '20px',
  marginBottom: '10px'
};

const FoodPlaceSelect = ({onClick, foodPlaces}) => {
  if (foodPlaces === null) {
    return (
      <div style={style}>
        Loading food places...
      </div>
    );
  }

  var items = _.map(foodPlaces, (foodPlace) => {
    return (
      <li onClick={() => onClick(Event.SHOW, foodPlace._id)} key={foodPlace.name}>
        <a href='#'>{`(${foodPlace.lang}) ${foodPlace.name}`}</a>
      </li>
    );
  });

  items = _.orderBy(items, (item) => {
    return item.name;
  });

  return (
    <div style={style} className="dropdown">
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
    </div>
  );
};

export default FoodPlaceSelect;
