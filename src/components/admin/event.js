const Event = Object.freeze({
  NEW                   : 0,
  SAVE                  : 1,
  COPY                  : 2,
  SHOW                  : 3,
  DELETE                : 4,
  DELETE_ALL            : 5,
  SEARCH                : 6,
  ADD_TEMPLATE          : 7,

  LANG_CHANGE           : 8,
  NAME_CHANGE           : 9,
  TAGS_CHANGE           : 10,
  HOURS_CHANGE          : 11,
  ADDRESS_CHANGE        : 12,
  IMAGES_GALLERY_CHANGE : 13,
  IMAGES_BANNER_CHANGE  : 14,

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
});

const lut = {
  lang : Event.LANG_CHANGE,
  name : Event.NAME_CHANGE,
  address : Event.ADDRESS_CHANGE,
  hours : Event.HOURS_CHANGE,
  tags : Event.TAGS_CHANGE,
  images : {
    gallery : Event.IMAGES_GALLERY_CHANGE,
    banner : Event.IMAGES_BANNER_CHANGE
  }
};

export const propToEvent = (prop) => {
  if (typeof prop !== 'string') {
    return -1;
  }

  if (prop.indexOf('.') >= 0) {
    var props = prop.split('.');
    return lut[props[0]][props[1]];
  }
  return lut[prop];
}

export default Event;
