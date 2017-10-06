const Config = Object.freeze({
  DEBUG : 0,
  KEY : 1,
});

const min = 0;
const max = Object.keys(Config).length - 1;

var config = [];
config[Config.DEBUG] = true;
config[Config.KEY]   = 'xRhjaTRs';

const valid = (property) => {
  return property !== undefined
    && property >= min
    && property <= max;
};

export const setConfig = (property, value) => {
  if (valid(property)) {
    config[property] = value;
  }
};

export const getConfig = (property) => {
  if (valid(property)) {
    return config[property];
  }
};

export default Config;
