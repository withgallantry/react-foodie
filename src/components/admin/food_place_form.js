import React from 'react';
import _ from 'lodash';
import { Event } from './admin';

const formStyle = {
  marginLeft: '40px'
};

const labelStyle = {
  display: 'inline-block',
  width: '100px',
  textAlign: 'right',
  marginRight: '20px'
};

const formRowStyle = {
  marginTop: '2px'
};

const saveBtnStyle = {
  marginTop: '10px',
  marginLeft: '120px'
};

const newBtnStyle = {
  marginTop: '10px',
  marginLeft: '10px'
};

const FoodPlaceForm = ({selectedFoodPlace, onClick}) => {
  var rows = [
    {label: 'name',            value: ''},
    {label: 'lang',            value: ''},
    {label: 'tags',            value: ''},
    {label: 'hours',           value: ''},
    {label: 'address',         value: ''},
    {label: 'images.gallery',  value: ''},
    {label: 'images.banner',   value: ''},
  ];

  if (selectedFoodPlace !== null) {
    const setProperty = (array, label, value) => {
      var match = _.find(array, (row) => {
        return row.label === label;
      });
      if (match) {
        match.value = value;
      }
    };

    setProperty(rows, 'name',           selectedFoodPlace.name);
    setProperty(rows, 'lang',           selectedFoodPlace.lang);
    setProperty(rows, 'tags',           selectedFoodPlace.tags);
    setProperty(rows, 'hours',          selectedFoodPlace.hours);
    setProperty(rows, 'address',        selectedFoodPlace.address);
    setProperty(rows, 'images.gallery', selectedFoodPlace.gallery);
    setProperty(rows, 'images.banner',  selectedFoodPlace.banner);
  }

  var formRows = _.map(rows, (row) => {
    return (
      <div style={formRowStyle} className="block" key={row.label}>
        <label style={labelStyle} htmlFor={row.label}>{row.label}: </label>
        <input type="text" size='35' id={row.label} placeholder={row.value}/>
      </div>
    );
  });

  var selectedId = selectedFoodPlace !== null ? selectedFoodPlace._id : null;
  return (
    <div>
      <form style={formStyle}>
        {formRows}
        <button
          style={saveBtnStyle}
          type="button"
          className="btn btn-default"
          onClick={() => onClick(Event.SAVE, selectedId)}>
          Save
        </button>
        <button
          style={newBtnStyle}
          type="button"
          className="btn btn-default"
          onClick={() => onClick(Event.NEW)}>
          New
        </button>
        <button
          style={newBtnStyle}
          type="button"
          className="btn btn-default"
          onClick={() => onClick(Event.COPY, selectedId)}>
          Copy
        </button>
      </form>
    </div>
  );
};

export default FoodPlaceForm;
