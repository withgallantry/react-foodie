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
  marginTop: '2px',
  marginLeft: '160px'
};

const itemInputStyle = {
  marginRight: '4px'
};

const btnStyle = {
  marginRight: '12px'
};

const btnNewItemStyle = {
  marginLeft: '160px',
  marginTop: '2px'
};

const inputMenuNameSize = '35';
const inputItemDescSize = '100';
const inputItemNameSize = inputMenuNameSize;
const inputItemPriceSize = '4';

const FormItem = ({menu, index, onChange, onClick}) => {
  var items = [];
  for (var i = 0; i < menu.items.length; ++i) {
    ((x) => {
      var item = menu.items[x];
      items.push((
        <div
          style={formRowStyle}
          className="block"
          key={`menu${index}.item${i}`}>
          <button
            style={btnStyle}
            type="button"
            onClick={() => onClick(Event.REMOVE_MENU_ITEM, index, x)}>
            <span className='glyphicon glyphicon-trash'></span>
          </button>
          <input
            style={itemInputStyle}
            type="text"
            size={inputItemNameSize}
            id={item.name}
            onChange={(event) => onChange(
              Event.MENU_CHANGE_ITEM,
              index,
              x,
              'name',
              event.target.value)
            }
            value={item.name}
          />
          <input
            style={itemInputStyle}
            type="text"
            size={inputItemDescSize}
            id={item.desc}
            onChange={(event) => onChange(
              Event.MENU_CHANGE_ITEM,
              index,
              x,
              'desc',
              event.target.value)
            }
            value={item.desc}
          />
          <input
            style={itemInputStyle}
            type="text"
            size={inputItemPriceSize}
            id={item.price}
            onChange={(event) => onChange(
              Event.MENU_CHANGE_ITEM,
              index,
              x,
              'price',
              event.target.value)
            }
            value={item.price}
          />
        </div>
      ));
    })(i);
  }

  return (
    <div>
      <label
        style={labelStyle}>
        {`menu${index + 1}`}:
      </label>
      <button
        style={btnStyle}
        type="button"
        onClick={() => onClick(Event.REMOVE_MENU, index)}>
        <span className='glyphicon glyphicon-trash'></span>
      </button>
      <input
        type="text"
        size={inputMenuNameSize}
        id={'sdsds'}
        onChange={(event) => onChange(Event.MENU_CHANGE_NAME, index, event.target.value)}
        value={menu.name}
      />
      {
        _.forEach(items, (item) => {
          return item;
        })
      }
      <div>
        <button
          style={btnNewItemStyle}
          type='button'
          onClick={() => onClick(Event.NEW_MENU_ITEM, index)}>
          <span className='glyphicon glyphicon-plus'></span>
        </button>
      </div>
    </div>
  );
};

export default FormItem;
