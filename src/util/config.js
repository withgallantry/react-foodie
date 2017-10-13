export const DEBUG = 0;
export const KEY   = 1;

const min = 0;
const max = KEY;

let config = [];
config[DEBUG] = true;
config[KEY]   = 'xRhjaTRs';

const isValid = (property) => {
  return property !== undefined
    && property >= min
    && property <= max;
};

export const set = (property, value) => {
  if (isValid(property)) {
    config[property] = value;
  }
};

export const get = (property) => {
  if (isValid(property)) {
    return config[property];
  }
};
