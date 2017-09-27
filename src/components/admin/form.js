import React from 'react';
import _ from 'lodash';
import FormRowSingleLine from './form_row_single_line';
import FormRowMultiLine from './form_row_multi_line';
import Button from '../util/button';
import ButtonAddMenu from './button_add_menu';
import { Event } from './admin';

const formStyle = {
  position: 'absolute',
  top: '160px',
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
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

  // remove dynamic 'menu' from rows, it is handled by specific
  // multi line component.
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

  // single line form rows
  var singleLineFormRows = _.map(rows, (row) => {
    return (
      <FormRowSingleLine
        key={row.label}
        div={{ style : formRowStyle }}
        label={{
          style : labelStyle,
          htmlFor : row.label,
          text : row.label
        }}
        input={{
          id : row.label,
          value : row.value,
          onChange : {
            func : props.onChange,
            args : [row.label]
          }
        }}
      />
    );
  });

  // multi line form rows
  var multiLineFormRows = [];
  if (props.menu) {
    for (var i = 0; i < props.menu.length; ++i) {
      var menu = props.menu[i];
      multiLineFormRows.push((
        <div key={`menu${i}`}>
          <hr />
          <FormRowMultiLine
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
        {singleLineFormRows}
        {
          _.forEach(multiLineFormRows, (row) => {
            return row;
          })
        }
      </div>
      <hr />
      <ButtonAddMenu onClick={props.onClick}/>
    </div>
  );
};

export default Form;
