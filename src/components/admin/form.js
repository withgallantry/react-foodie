import React from 'react';
import _ from 'lodash';
import FormItem from './form_item';
import { Event } from './admin';

const formStyle = {
  position: 'absolute',
  top: '160px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const hrStyle = {
  margin: '0px',
  padding: '0px',
  boxSizing: 'border-box'
};

const labelStyle = {
  display: 'inline-block',
  width: '140px',
  textAlign: 'right',
  marginRight: '20px'
};

const formRowStyle = {
  marginTop: '2px'
};

const newMenuBtnStyle = {
  marginLeft: '160px',
  marginBottom: '40px'
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

  // remove 'menu' from rows, it is handled by specific component
  var menuIndex = _.findIndex(rows, (row) => {
    return row.label === 'menu';
  });
  if (menuIndex >= 0) {
    rows.splice(menuIndex, 1);
  }

  // remove 'images' from rows, modify and add back.
  var imagesIndex = _.findIndex(rows, (row) => {
    return row.label === 'images';
  });
  if (imagesIndex >= 0) {
    var images = rows.splice(imagesIndex, 1)[0];
    if (images.value) {
      rows.push({ label: 'images.gallery', value: images.value.gallery });
      rows.push({ label: 'images.banner',  value: images.value.banner });
    }
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
            onClick={props.onClick}
          />
        </div>
      ));
    }
  }

  return (
    <div style={formStyle}>
      <div style={{marginTop : '10px'}}>
        {formRows}
        {
          _.forEach(items, (item) => {
            return item;
          })
        }
      </div>
      <hr style={hrStyle}/>
      <button
        style={newMenuBtnStyle}
        type='button'
        onClick={() => props.onClick(Event.NEW_MENU)}>
        <span className='glyphicon glyphicon-plus'></span>
      </button>
    </div>
  );
};

export default Form;
