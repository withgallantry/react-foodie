const Event = Object.freeze({
  NEW                   : 0,
  SAVE                  : 1,
  COPY                  : 2,
  SHOW                  : 3,
  DELETE                : 4,
  SEARCH                : 5,
  ADD_TEMPLATE          : 6,

  LANG_CHANGE           : 7,
  NAME_CHANGE           : 8,
  TAGS_CHANGE           : 9,
  HOURS_CHANGE          : 10,
  ADDRESS_CHANGE        : 11,
  IMAGES_GALLERY_CHANGE : 12,
  IMAGES_BANNER_CHANGE  : 13,

  CHANGE_MENU_ITEM      : 14,
  CHANGE_MENU_NAME      : 15,
  REMOVE_MENU_ITEM      : 16,
  REMOVE_MENU           : 17,
  NEW_MENU_ITEM         : 18,
  NEW_MENU              : 19,
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
