import React from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Button from '../../shared/html/button';
import * as Event from './event';

const span = {
  float: 'left',
};

const btnLandscape = {
  marginLeft: '2px',
  marginRight: '2px',
  paddingLeft: '5px',
  paddingRight: '5px',
  paddingTop: 0,
  paddingBottom: 0,
};

const btnPortrait = {
  marginLeft: '4px',
  marginRight: '4px',
  paddingLeft: '10px',
  paddingRight: '10px',
  paddingTop: '5px',
  paddingBottom: '5px',
};

const createButton = (onClick, id, event, style, glyph) => {
  return (
    <Button
      key={`${id}${glyph}`}
      style={style}
      className='btn btn-default order-item-button'
      glyphicon={glyph}
      onClick={{
        func : onClick,
        id : event,
        args : [id]
      }}
    />
  );
};

const OrderItemMenu = ({onClick, id}) => {
  const createButtons = (style) => {
    let result = [];
    result.push(createButton(onClick, id, Event.INCREASE_ITEM, style, 'plus'));
    result.push(createButton(onClick, id, Event.DECREASE_ITEM, style, 'minus'));
    result.push(createButton(onClick, id, Event.REMOVE_ITEM, style, 'trash'));
    return result;
  }

  return (
    <span style={span}>
      <MediaQuery query='(orientation: portrait)'>
        {createButtons(btnPortrait)}
      </MediaQuery>
      <MediaQuery query='(orientation: landscape)'>
        {createButtons(btnLandscape)}
      </MediaQuery>
    </span>
  );
};

OrderItemMenu.propTypes = {
  onClick: PropTypes.func,
  id: PropTypes.string,
};

export default OrderItemMenu;
