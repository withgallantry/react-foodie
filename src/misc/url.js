import * as Debug from './debug';
import * as Settings from './settings';

export const ROOT        = 0;
export const DELETE_ALL  = 1;
export const TEMPLATE    = 2;
export const DEFAULT_KEY = 3;

const min = DELETE_ALL;
const max = DEFAULT_KEY;

const ROOT_URL = 'https://agile-taiga-67906.herokuapp.com/store';
//const ROOT_URL = 'http://localhost:5000/store';

let urlTypes = [];
urlTypes[DELETE_ALL]  = `delete-all`;
urlTypes[TEMPLATE]    = `template`;
urlTypes[DEFAULT_KEY] = 'default-key';

export const get = (type, id, fetchKey = true) => {
  const key = fetchKey === true ? Settings.get(Settings.KEY) : undefined;
  const url = ROOT_URL;

  let result;
  if (id !== undefined) {
    if (key !== undefined) {
      result = `${url}/${key}/${id}`;
    } else {
      result = `${url}/${id}`;
    }
  } else {
    if (key !== undefined) {
      result = `${url}/${key}`;
    } else {
      result = url;
    }
  }

  if (type !== undefined) {
    if (type >= min && type <= max) {
      result = `${result}/${urlTypes[type]}`;
    } else if (type !== ROOT){
      Debug.log(`missing Url.${type}`);
    }
  }
  return result;
};
