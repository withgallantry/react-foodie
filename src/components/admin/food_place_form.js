import React from 'react';
import _ from 'lodash';
import { Event } from './admin';

const labelStyle = {
  display: 'inline-block',
  width: '140px',
  textAlign: 'right',
  marginRight: '20px'
};

const formRowStyle = {
  marginTop: '2px'
};

const firstBtnStyle = {
  marginTop: '10px',
  marginLeft: '160px'
};

const otherBtnStyle = {
  marginTop: '10px',
  marginLeft: '10px'
};

const FoodPlaceForm = (props) => {
  // exclude on... events
  var keys = _.filter(Object.keys(props), (key) => {
    return key.substring(0, 2) !== 'on'
  });
  var rows = _.map(keys, (key) => {
    return {
      label: key,
      value: props[key]
    };
  });

  var menuIndex = _.findIndex(rows, (row) => {
    return row.label === 'menu';
  });
  if (menuIndex >= 0) {
    var menu = rows.splice(menuIndex, 1)[0];
  }

  var formRows = _.map(rows, (row) => {
    return (
      <div
        style={formRowStyle}
        className="block"
        key={row.label}>
        <label
          style={labelStyle}
          htmlFor={row.label}>
          {row.label}:
        </label>
        <input
          type="text"
          size='35'
          id={row.label}
          onChange={(event) => props.onChange(row.label, event.target.value)}
          placeholder={row.value}/>
      </div>
    );
  });

  return (
    <div>
      {formRows}
      <button
        style={firstBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => props.onClick(Event.SAVE)}>
        Save
      </button>
      <button
        style={otherBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => props.onClick(Event.NEW)}>
        New
      </button>
      <button
        style={otherBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => props.onClick(Event.COPY)}>
        Copy
      </button>
      <button
        style={otherBtnStyle}
        type="button"
        className="btn btn-default"
        onClick={() => props.onClick(Event.DELETE)}>
        Delete
      </button>
    </div>
  );
};

export default FoodPlaceForm;
