import React from 'react';
import _ from 'lodash';

const FoodPlaceFormMenu = ({menu, onClick}) => {
  const items = _.map(menu, (item) => {
    return (
      <div key={1}>
        item
      </div>
    );
  });
  return (
    <div>
      <label>{menu.name}</label>
      {items}
    </div>
  );
};

export default FoodPlaceFormMenu;
