import React, { Component } from 'react';
import _ from 'lodash';
import FormRowSingleInput from './form_row_single_input';
import FormRowsMultiInput from './form_rows_multi_input';
import Button from '../shared/html/button';
import { createButton } from './button_row';
import Event from './event';
import Language from '../../util/localization/language';
import { replaceAt, sequence, cloneDeep } from '../../util/util';
import { ADMIN_MARGIN_LEFT, ADMIN_LABEL_WIDTH, ADMIN_LABEL_MARGIN,
  ADMIN_FORM_TOP, ADMIN_FORM_ROW_MARGIN_TOP, ADMIN_SECTION_MARGIN_HEIGHT } from '../../util/constants';

export const RowType = Object.freeze({
  INPUT           : 0,
  DROP_DOWN       : 1,
  IMAGE_SELECTION : 2,
  SEARCH_BAR      : 3,
});

const FORM_STYLE = {
  position: 'absolute',
  top: ADMIN_FORM_TOP,
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll'
};

const LABEL_STYLE = {
  display: 'inline-block',
  width: ADMIN_LABEL_WIDTH,
  textAlign: 'right',
  marginRight: ADMIN_LABEL_MARGIN,
};

const FORM_ROW_STYLE = {
  marginTop: ADMIN_FORM_ROW_MARGIN_TOP
};

const NEW_MENU_BTN_STYLE = {
  marginLeft: ADMIN_MARGIN_LEFT,
  marginBottom: '40px'
};

const DROP_DOWN_STYLE = {
  display: 'inline',
};

const HR_STYLE = {
  margin: '0',
  padding: '0',
  paddingTop: ADMIN_SECTION_MARGIN_HEIGHT,
  marginTop: ADMIN_SECTION_MARGIN_HEIGHT,
};

const createListSequence = (begin, end, interval = 1) => {
  let seq = sequence(begin, end, interval);
  let result = [];
  for (let i of seq) {
    let str = i < 10 ? `0${i}` : i;
    result.push({
      value : str,
      args : [str]
    });
  }
  return result;
};

const Form = (props) => {
  let rows = _.map(Object.keys(props.singleInput), (key) => {
    return {
      label: key,
      value: props.singleInput[key],
      type: RowType.INPUT,
    };
  });

  // remove 'address' from rows, modify and add back
  let addressIndex = _.findIndex(rows, (row) => {
    return row.label === 'address';
  })
  if (addressIndex > 0) {
    let address = rows.splice(addressIndex, 1)[0];
    address.type = RowType.SEARCH_BAR;
    address.searchBar = {
      onChange: props.onAddressChange,
      placeholder: address.value
    };
    rows.push(address);
  }

  // remove 'hours' from rows, modify and add back.
  let hoursIndex = _.findIndex(rows, (row) => {
    return row.label === 'hours';
  });
  if (hoursIndex >= 0) {
    let hours = rows.splice(hoursIndex, 1)[0];
    if (! hours.value) {
      hours.value = {
        opensAt : { hours : '', minutes : '' },
        closesAt : { hours : '', minutes : '' }
      };
    }
    if (hours.value) {
      let opensAt  = { label : 'hours.opensAt'  };
      let closesAt = { label : 'hours.closesAt' };
      let dropDown = {
        count : 2,
        style : DROP_DOWN_STYLE,
        rows : [createListSequence(0, 23), createListSequence(0, 55, 5)],
        href : "#/admin"
      };

      let opensAtDropDown = cloneDeep(dropDown);
      opensAtDropDown.selected = [hours.value.opensAt.hours, hours.value.opensAt.minutes];
      opensAtDropDown.ids = [Event.HOURS_OPENS_CHANGE, Event.MINUTES_OPENS_CHANGE];
      opensAtDropDown.onClick = props.onClick;

      let closesAtDropDown = cloneDeep(dropDown);
      closesAtDropDown.selected = [hours.value.closesAt.hours, hours.value.closesAt.minutes];
      closesAtDropDown.ids = [Event.HOURS_CLOSES_CHANGE, Event.MINUTES_CLOSES_CHANGE];
      closesAtDropDown.onClick = props.onClick;

      opensAt.dropDown = opensAtDropDown;
      opensAt.type = RowType.DROP_DOWN;
      closesAt.dropDown = closesAtDropDown;
      closesAt.type = RowType.DROP_DOWN;
      rows.push(opensAt);
      rows.push(closesAt);
    }
  }

  // remove 'images' from rows, modify and add back.
  let imagesIndex = _.findIndex(rows, (row) => {
    return row.label === 'images';
  });
  if (imagesIndex >= 0) {
    let images = rows.splice(imagesIndex, 1)[0];
    if (! images.value) {
      images.value = {
        gallery : '',
        banner : ''
      };
    }
    if (images.value) {
      rows.push({ label: 'images.gallery', value: images.value.gallery, type : RowType.IMAGE_SELECTION });
      rows.push({ label: 'images.banner',  value: images.value.banner,  type : RowType.IMAGE_SELECTION });
    }
  }

  // single input form rows
  let singleInputFormRows = _.map(rows, (row) => {
    return (
      <FormRowSingleInput
        key={row.label}
        div={{ style : FORM_ROW_STYLE }}
        label={{
          style : LABEL_STYLE,
          htmlFor : row.label,
          text : row.label
        }}
        type={row.type}
        input={{
          id : row.label,
          value : row.value,
          onChange : {
            func : props.onChange,
            args : [row.label]
          }
        }}
        dropDown={row.dropDown}
        imageSelection={{
          onClick : props.onClick,
          label : row.label,
          value : row.value
        }}
        searchBar={row.searchBar}
      />
    );
  });

  // multi input form rows
  let multiInputFormRows = [];
  if (props.menu) {
    let menu = props.menu[props.lang];
    for (let i = 0; i < menu.length; ++i) {
      let current = menu[i];
      multiInputFormRows.push((
        <div key={`current${i}`}>
          <hr style={HR_STYLE}/>
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
    <div style={FORM_STYLE}>
      <div style={{marginTop : ADMIN_SECTION_MARGIN_HEIGHT}}>
        {singleInputFormRows}
        {
          _.forEach(multiInputFormRows, (row) => {
            return row;
          })
        }
      </div>
      <hr />
      {createButton('plus', props.onClick, Event.NEW_MENU, 0, NEW_MENU_BTN_STYLE)}
    </div>
  );
};

export default Form;
