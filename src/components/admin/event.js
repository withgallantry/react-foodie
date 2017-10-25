/*
  All events that can happen for Admin route.
*/
export const NEW                   = 0;
export const SAVE                  = 1;
export const COPY                  = 2;
export const SHOW                  = 3;
export const DELETE                = 4;
export const DELETE_ALL            = 5;
export const SEARCH                = 6;
export const ADD_TEMPLATE          = 7;
export const SET_TEMPLATE          = 8;

export const NAME_CHANGE           = 9;
export const TAGS_CHANGE           = 10;
export const HOURS_OPENS_CHANGE    = 11;
export const HOURS_CLOSES_CHANGE   = 12;
export const MINUTES_OPENS_CHANGE  = 13;
export const MINUTES_CLOSES_CHANGE = 14;
export const ADDRESS_CHANGE        = 15;

export const CHANGE_MENU_ITEM      = 16;
export const CHANGE_MENU_NAME      = 17;
export const REMOVE_MENU_ITEM      = 18;
export const REMOVE_MENU           = 19;
export const NEW_MENU_ITEM         = 20;
export const NEW_MENU              = 21;

export const MOVE_MENU_ITEM_UP     = 22;
export const MOVE_MENU_ITEM_DOWN   = 23;
export const MOVE_MENU_UP          = 24;
export const MOVE_MENU_DOWN        = 25;

export const GET_JSON              = 26;
export const CHANGE_KEY            = 27;
export const CHANGE_LANG           = 28;
export const CLONE                 = 29;

export const SET_IMAGE_GALLERY     = 30;
export const SET_IMAGE_BANNER      = 31;
export const RESET                 = 32;

const LUT = {
  name : NAME_CHANGE,
  address : ADDRESS_CHANGE,
  tags : TAGS_CHANGE,
  hours : {
    opensAt : HOURS_OPENS_CHANGE,
    closesAt : HOURS_CLOSES_CHANGE
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
