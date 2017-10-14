import * as Language from './localization/language';

export const DEBUG      = 0;
export const KEY        = 1;
export const LANGUAGE   = 3;

const min = 0;
const max = LANGUAGE;

let settings = [];
settings[DEBUG]     = true;
settings[KEY]       = 'xRhjaTRs';
settings[LANGUAGE]  = Language.SV;

const isValid = (property) => {
  return property !== undefined
    && property >= min
    && property <= max;
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
};
