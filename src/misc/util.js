import 'babel-polyfill/dist/polyfill';

function* range (begin, end, interval = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i;
  }
};

export const getNumericValue  = (str) => parseInt(str.replace(/[^\d.]/g, ''));
export const generateKey      = ()    => Math.random().toString(36).substr(2, 9);
export const removeWhiteSpace = (str) => str.replace(/\s/g, '');
export const isEmpty          = (str) =>  !str || !str.length;

// NOTE : This method will also remove the keys from your object, which have
// functions as their values, because the JSON doesn't support functions.
// Date objects will also be converted back to UTC in the string representation
// in the ISO8601 format.
export const cloneDeep = (obj) => JSON.parse(JSON.stringify(obj));

export const replaceAt = (str, index, replacement) => {
  str.substr(0, index) + replacement + str.substr(index + replacement.length);
};

export const replaceAll = (str, search, replacement) => {
  return str.split(search).join(replacement);
};

export const sequence = (begin, end, interval = 1) => {
  let iter = range(begin, end, interval);
  let result = [];
  let next = null;
  do {
    next = iter.next();
    result.push(next.value);
  } while (! next.done);
  result.pop();
  return result;
};
