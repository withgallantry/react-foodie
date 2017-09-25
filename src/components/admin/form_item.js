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

const inputMenuNameSize = '35';
const inputItemDescSize = '100';
const inputItemNameSize = inputMenuNameSize;
const inputItemPriceSize = '4';

const FormItem = ({menu, index, onChange}) => {
  var items = [];
  for (var i = 0; i < menu.items.length; ++i) {
    ((x) => {
      var item = menu.items[x];
      items.push((
        <div
          style={formRowStyle}
          className="block"
          key={`menu${index}.item${i}`}>
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
    </div>
  );
};

export default FormItem;
