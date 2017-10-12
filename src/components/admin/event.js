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
  HOURS_CLOSES_CHANGE   : 11,
  MINUTES_OPENS_CHANGE  : 12,
  MINUTES_CLOSES_CHANGE : 13,
  ADDRESS_CHANGE        : 14,

  CHANGE_MENU_ITEM      : 15,
  CHANGE_MENU_NAME      : 16,
  REMOVE_MENU_ITEM      : 17,
  REMOVE_MENU           : 18,
  NEW_MENU_ITEM         : 19,
  NEW_MENU              : 20,

  MOVE_MENU_ITEM_UP     : 21,
  MOVE_MENU_ITEM_DOWN   : 22,
  MOVE_MENU_UP          : 23,
  MOVE_MENU_DOWN        : 24,

  GET_JSON              : 25,
  CHANGE_KEY            : 26,
  CHANGE_LANG           : 27,
  CLONE                 : 28,

  SET_IMAGE_GALLERY     : 29,
  SET_IMAGE_BANNER      : 30
});

const LUT = {
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
    const props = prop.split('.');
    return LUT[props[0]][props[1]];
  }
  return LUT[prop];
}

export default Event;
