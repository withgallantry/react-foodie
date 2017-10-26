import * as Constants from './constants';
import * as Cookies from './cookies';
import * as Db from './db';
import * as Settings from './settings';

let defaultKey = 'default';

const findKey = () => {
  // look for key in cookies
  let key = Cookies.get(Constants.COOKIES_KEY);
  if (key) {
    Settings.set(Settings.KEY, key);
    return key;
  }

  // check settings
  key = Settings.get(Settings.KEY);
  if (key) {
    return key;
  }

  // nothing found, set default key as current key
  Settings.set(Settings.KEY, defaultKey);
  return defaultKey;
};

/*
  Updates the current key used for a set of stores.
*/
export const update = (onFinished) => {
  // get default from db
  Db.getDefaultKey().then((response) => {
    defaultKey = response.data;
    onFinished(findKey());
  }).catch((error) => {
    onFinished(findKey());
    console.error(error);
  });
};

export const getDefault = () => {
  return defaultKey;
};
