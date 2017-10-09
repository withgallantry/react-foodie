const Event = Object.freeze({
  NEW                   : 0,
  SAVE                  : 1,
  COPY                  : 2,
  SHOW                  : 3,
  DELETE                : 4,
  DELETE_ALL            : 5,
  SEARCH                : 6,
  ADD_TEMPLATE          : 7,

  NAME_CHANGE           : 8,
  TAGS_CHANGE           : 9,
  HOURS_OPENS_CHANGE    : 10,
  HOURS_CLOSES_CHANGE   : 28,
  MINUTES_OPENS_CHANGE  : 29,
  MINUTES_CLOSES_CHANGE : 30,
  ADDRESS_CHANGE        : 11,

  CHANGE_MENU_ITEM      : 14,
  CHANGE_MENU_NAME      : 15,
  REMOVE_MENU_ITEM      : 16,
  REMOVE_MENU           : 17,
  NEW_MENU_ITEM         : 18,
  NEW_MENU              : 19,

  MOVE_MENU_ITEM_UP     : 20,
  MOVE_MENU_ITEM_DOWN   : 21,
  MOVE_MENU_UP          : 22,
  MOVE_MENU_DOWN        : 23,

  GET_JSON              : 24,
  CHANGE_KEY            : 25,
  CHANGE_LANG           : 26,
  CLONE                 : 27,
  
  SET_IMAGE_GALLERY     : 33,
  SET_IMAGE_BANNER      : 34
});

const lut = {
  name : Event.NAME_CHANGE,
  address : Event.ADDRESS_CHANGE,
  tags : Event.TAGS_CHANGE,
  hours : {
    opensAt : Event.HOURS_OPENS_CHANGE,
    closesAt : Event.HOURS_CLOSES_CHANGE
  }
};

export const propToEvent = (prop) => {
  if (typeof prop !== 'string') {
    return -1;
  }

  if (prop.indexOf('.') >= 0) {
    let props = prop.split('.');
    return lut[props[0]][props[1]];
  }
  return lut[prop];
}

export default Event;
