const Event = Object.freeze({
  NEW                   : 0,
  SAVE                  : 1,
  COPY                  : 2,
  SHOW                  : 3,
  LANG_CHANGE           : 4,
  NAME_CHANGE           : 5,
  TAGS_CHANGE           : 6,
  HOURS_CHANGE          : 7,
  ADDRESS_CHANGE        : 8,
  MENU_CHANGE_ITEM      : 9,
  DELETE                : 10,
  SEARCH                : 11,
  ADD_TEMPLATE          : 12,
  IMAGES_GALLERY_CHANGE : 13,
  IMAGES_BANNER_CHANGE  : 14,
  REMOVE_MENU_ITEM      : 15,
  REMOVE_MENU           : 16,
  NEW_MENU_ITEM         : 17,
  NEW_MENU              : 18,
  MENU_CHANGE_NAME      : 19
});

const events = {
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
    return events[props[0]][props[1]];
  }
  return events[prop];
}

export default Event;
