import React from 'react';
import _ from 'lodash';
import FormItem from './form_item';
import FormMenu from './form_menu';
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

const Form = (props) => {
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
          value={row.value}
        />
      </div>
    );
  });

  var items = [];
  if (props.menu) {
    for (var i = 0; i < props.menu.length; ++i) {
      var menu = props.menu[i];
      items.push((
        <div key={`menu${i}`}>
          <hr />
          <FormItem
            menu={menu}
            index={i}
            onChange={props.onChange}
          />
        </div>
      ));
    }
  }

  return (
    <div>
      {formRows}
      {
        _.forEach(items, (item) => {
          return item;
        })
      }
      <hr />
      <FormMenu onClick={props.onClick}/>
    </div>
  );
};

export default Form;
