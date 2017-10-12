import Models, { getModel } from './models';

const min = 0;
const max = Object.keys(Models).length - 1;

// compares js objects recursively so they have identical properties
const compareKeysJson = (a, b) => {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  const isEqual = JSON.stringify(aKeys) === JSON.stringify(bKeys);
  if (isEqual === false) {
    return false;
  }

  for (let key of aKeys) {
    if (a[key].constructor === {}.constructor) {
      if (compareKeysJson(a[key], b[key]) === false) {
        return false;
      }
    } else if (a[key].constructor === [].constructor) {
      if (compareKeysArray(a[key], b[key]) === false) {
        return false;
      }
    }
  }
  return true;
}

// compares only first element in array, assumes all elements have identical
// properties.
const compareKeysArray = (a, b) => {
  if (a.length > 0 && b.length > 0) {
    if (a[0].constructor === {}.constructor) {
      if (compareKeysJson(a[0], b[0]) === false) {
        return false;
      }
    } else if (a[0].constructor === [].constructor) {
      if (compareKeysArray(a[0], b[0]) === false) {
        return false;
      }
    }
  }
  return true;
}

export const validateModel = (model, type) => {
  if (model !== undefined && !isNaN(type) && type >= min && type <= max) {
    const model2 = getModel(type);
    if (model2) {
      return compareKeysJson(model, model2);
    }
  }
}
