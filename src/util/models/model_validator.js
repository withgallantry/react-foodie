import * as Models from './models';

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
    const elemA = a[0];
    const elemB = b[0];
    if (elemA.constructor === {}.constructor) {
      if (compareKeysJson(elemA, elemB) === false) {
        return false;
      }
    } else if (elemA.constructor === [].constructor) {
      if (compareKeysArray(elemA, elemB) === false) {
        return false;
      }
    }
  }
  return true;
}

export const validate = (model, type) => {
  if (model !== undefined && !isNaN(type) && type >= min && type <= max) {
    const model2 = Models.get(type);
    if (model2) {
      return compareKeysJson(model, model2);
    }
  }
}
