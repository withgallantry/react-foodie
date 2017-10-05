import React, { Component } from 'react';
import _ from 'lodash';
import FormRowSingleInput from './form_row_single_input';
import FormRowsMultiInput from './form_rows_multi_input';
import Button from '../html/button';
import { createButton } from './button_row';
import Event from './event';
import Language from '../../util/localization/language';

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

const dropDownStyle = {
  marginLeft: '160px',
  marginBottom: '10px',
  paddingTop: '5px'
};

const langBtnStyle = {
  marginLeft: '160px',
  marginBottom: '15px'
};

const Form = (props) => {
  var rows = _.map(Object.keys(props.singleInput), (key) => {
    return {
      label: key,
      value: props.singleInput[key]
    };
  });

  // remove 'images' from rows, modify and add back.
  var imagesIndex = _.findIndex(rows, (row) => {
    return row.label === 'images';
  });
  if (imagesIndex >= 0) {
    var images = rows.splice(imagesIndex, 1)[0];
    if (! images.value) {
      images.value = {
        gallery : '',
        banner : ''
      };
    }
    if (images.value) {
      rows.push({ label: 'images.gallery', value: images.value.gallery });
      rows.push({ label: 'images.banner',  value: images.value.banner });
    }
  }

  // single input form rows
  var singleInputFormRows = _.map(rows, (row) => {
    return (
      <FormRowSingleInput
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

  // multi input form rows
  var multiInputFormRows = [];
  if (props.menu) {
    let menu = props.menu[props.lang];
    for (let i = 0; i < menu.length; ++i) {
      let current = menu[i];
      multiInputFormRows.push((
        <div key={`current${i}`}>
          <hr />
          <FormRowsMultiInput
            menu={current}
            index={i}
            onChange={props.onChange}
            onClick={props.onClick}
            lang={props.lang}
          />
        </div>
      ));
    }
  }

  return (
    <div style={formStyle}>
      <div style={{marginTop : '10px'}}>
        {singleInputFormRows}
        {
          _.forEach(multiInputFormRows, (row) => {
            return row;
          })
        }
      </div>
      <hr />
      {createButton('plus', props.onClick, Event.NEW_MENU, 0, newMenuBtnStyle)}
    </div>
  );
};

export default Form;
