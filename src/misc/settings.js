import * as Constants from './constants';
import * as Language from './localization/language';

export const DEBUG        = 0;
export const KEY          = 1;
export const LANGUAGE     = 2;

const MIN = DEBUG;
const MAX = LANGUAGE;

let settings = [];
settings[DEBUG]     = true;
settings[KEY]       = undefined;
settings[LANGUAGE]  = Language.EN;

const isValid = (property) => {
  return property !== undefined
    && property >= MIN
    && property <= MAX;
};

export const set = (property, value) => {
  if (isValid(property)) {
    settings[property] = value;
  }
};

export const get = (property) => {
  if (isValid(property)) {
    return settings[property];
  }
  Debug.log(`missing Settings.${property}`);
};
