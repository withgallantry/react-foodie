import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from '../shared/html/button';
import FormRowsMultiInput from './form_rows_multi_input';
import FormRowSingleInput from './form_row_single_input';
import Info from '../shared/info';
import * as Constants  from '../../misc/constants';
import * as Event from './event';
import * as Language from '../../misc/localization/language';
import * as MenuButton from './menu_button';
import * as RowType from './row_type';
import * as Util from '../../misc/util';

const div = {
  position: 'absolute',
  top: Constants.ADMIN_FORM_TOP,
  left: '0px',
  right: '0px',
  bottom: '0px',
  overflowY: 'scroll',
};

const label = {
  display: 'inline-block',
  width: Constants.ADMIN_LABEL_WIDTH,
  textAlign: 'right',
  marginRight: Constants.ADMIN_LABEL_MARGIN,
};

const divRow = {
  marginTop: Constants.ADMIN_FORM_ROW_MARGIN_TOP
};

const btnNewMenu = {
  marginLeft: Constants.ADMIN_MARGIN_LEFT,
  marginBottom: '40px'
};

const divDropDown = {
  display: 'inline',
};

const hr = {
  margin: '0',
  padding: '0',
  paddingTop: Constants.ADMIN_SECTION_MARGIN_HEIGHT,
  marginTop: Constants.ADMIN_SECTION_MARGIN_HEIGHT,
};

const ERROR_MESSAGE = "Couldn\'t establish connection unfortunately...";

const createListSequence = (begin, end, interval = 1) => {
  const seq = Util.sequence(begin, end, interval);
  let result = [];
  for (let i of seq) {
    const str = i < 10 ? `0${i}` : i;
    result.push({
      value : str,
      args : [str]
    });
  }
  return result;
};

const modifyAddress = (rows, props) => {
  const addressIndex = _.findIndex(rows, (row) => {
    return row.label === 'address';
  })
  if (addressIndex > 0) {
    const address = rows[addressIndex];
    address.type = RowType.SEARCH_BAR;
    address.searchBar = {
      onChange: props.onAddressChange,
      placeholder: address.value
    };
  }
};

const modifyHours = (rows, props) => {
  const hoursIndex = _.findIndex(rows, (row) => {
    return row.label === 'hours';
  });
  if (hoursIndex >= 0) {
    const hours = rows.splice(hoursIndex, 1)[0];
    if (hours.value) {
      let opensAt  = { label : 'hours.opensAt',  type : RowType.DROP_DOWN };
      let closesAt = { label : 'hours.closesAt', type : RowType.DROP_DOWN };
      let dropDown = {
        count : 2,
        style : divDropDown,
        rows : [createListSequence(0, 23), createListSequence(0, 55, 5)],
        href : "#/admin"
      };

      const opensAtDropDown = Util.cloneDeep(dropDown);
      opensAtDropDown.selected = [hours.value.opensAt.hours, hours.value.opensAt.minutes];
      opensAtDropDown.ids = [Event.HOURS_OPENS_CHANGE, Event.MINUTES_OPENS_CHANGE];
      opensAtDropDown.onClick = props.onClick;

      const closesAtDropDown = Util.cloneDeep(dropDown);
      closesAtDropDown.selected = [hours.value.closesAt.hours, hours.value.closesAt.minutes];
      closesAtDropDown.ids = [Event.HOURS_CLOSES_CHANGE, Event.MINUTES_CLOSES_CHANGE];
      closesAtDropDown.onClick = props.onClick;

      opensAt.dropDown = opensAtDropDown;
      closesAt.dropDown = closesAtDropDown;
      rows.push(opensAt);
      rows.push(closesAt);
    }
  }
};

const modifyImages = (rows, props) => {
  const imagesIndex = _.findIndex(rows, (row) => {
    return row.label === 'images';
  });
  if (imagesIndex >= 0) {
    const images = rows.splice(imagesIndex, 1)[0];
    if (images.value) {
      rows.push({ label: 'images.gallery', value: images.value.gallery, type : RowType.IMAGE_SELECTION });
      rows.push({ label: 'images.banner',  value: images.value.banner,  type : RowType.IMAGE_SELECTION });
    }
  }
};

const Form = (props) => {
  const rows = _.map(Object.keys(props.singleInput), (key) => {
    return {
      label: key,
      value: props.singleInput[key],
      type: RowType.INPUT,
    };
  });

  // special form properties, not just a input field with text. Needs to be
  // modified separately
  modifyAddress(rows, props);
  modifyHours(rows, props);
  modifyImages(rows, props);

  const singleInputFormRows = _.map(rows, (row) => {
    return (
      <FormRowSingleInput
        key={row.label}
        div={{ style : divRow }}
        label={{
          style : label,
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

  let multiInputFormRows = [];
  if (props.menu) {
    const menu = props.menu[props.lang];
    for (let i = 0; i < menu.length; ++i) {
      const current = menu[i];
      multiInputFormRows.push((
        <div key={`multiInputFormRows${i}`}>
          <hr style={hr}/>
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

  if (props.error) {
    return <Info text={ERROR_MESSAGE}/>
  } else {
    return (
      <div style={div}>
        <div style={{marginTop : Constants.ADMIN_SECTION_MARGIN_HEIGHT}}>
          {singleInputFormRows}
          {multiInputFormRows}
        </div>
        <hr />
        {MenuButton.create('plus', props.onClick, Event.NEW_MENU, [], btnNewMenu)}
      </div>
    );
  }
};

Form.propTypes = {
  error: PropTypes.bool,
  singleInput: PropTypes.shape({
    name: PropTypes.string,
    tags: PropTypes.string,
    images: PropTypes.shape({
      gallery: PropTypes.string,
      banner: PropTypes.string,
    }),
    address: PropTypes.string,
    hours: PropTypes.shape({
      opensAt: PropTypes.shape({
        hours: PropTypes.string,
        minutes: PropTypes.string,
      }),
      closesAt: PropTypes.shape({
        hours: PropTypes.string,
        minutes: PropTypes.string,
      }),
    }),
  }),
  menu: PropTypes.shape({
    [Language.SV] : PropTypes.array,
    [Language.EN] : PropTypes.array,
  }),
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onAddressChange: PropTypes.func,
  lang: PropTypes.oneOf(Language.get()),
};

export default Form;
