import React from 'react';

import SubMenuItem from './sub_menu_item';
import * as Constants from '../../../misc/constants';

const div = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT,
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginRight: Constants.HOME_STORE_MARGIN_LEFT,
};

const hr = {
  margin: 0,
  padding: 0,
};

const p = {
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const divItem = {
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL,
};

const SubMenu = ({onClick, item, index}) => {
  let items = [];
  for (let i = 0; i < item.items.length; ++i) {
    let element = item.items[i];
    items.push((
      <SubMenuItem
        key={`subMenuItem${i}`}
        item={element}
        index={i}
        menu={index}
        onClick={onClick}
      />
    ));
  }

  return (
    <div>
      <div style={div}>
        <p
          id={`subMenu${index}`}
          style={p}>
          •  •  • &nbsp; {item.name.toUpperCase()} &nbsp; •  •  •
        </p>
      </div>
      <hr style={hr}/>
      <div style={divItem}>
        {items}
      </div>
      <hr style={hr}/>
    </div>
  );
};

export default SubMenu;
