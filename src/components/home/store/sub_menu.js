import React from 'react';

import SubMenuItem from './sub_menu_item';
import * as Constants from '../../../util/constants';

const STYLE = {
  marginLeft: Constants.HOME_STORE_MARGIN_LEFT,
  marginTop: Constants.HOME_STORE_MARGIN_VERTICAL,
  marginBottom: Constants.HOME_STORE_MARGIN_VERTICAL
};

const HR_STYLE = {
  margin: 0,
  padding: 0,
};

const ITEM_STYLE = {
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
      <div style={STYLE}>
        <p id={`subMenu${index}`} style={{ textAlign: 'center' }}> •  •  • &nbsp; {item.name.toUpperCase()} &nbsp; •  •  • </p>
      </div>
      <hr style={HR_STYLE}/>
      <div style={ITEM_STYLE}>
        {items}
      </div>
      <hr style={HR_STYLE}/>
    </div>
  );
};

export default SubMenu;
