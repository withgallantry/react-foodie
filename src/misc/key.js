import * as Constants from './constants';
import * as Cookies from './cookies';
import * as Db from './db';
import * as Settings from './settings';

let defaultKey = 'default';

/*
  Updates the current key used for a set of stores.
*/
export const update = (onFinished) => {
  // get default from db
  Db.getDefaultKey().then((response) => {
    defaultKey = response.data;

    // look for key in cookies
    let key = Cookies.get(Constants.COOKIES_KEY);
    if (key) {
      Settings.set(Settings.KEY, key);
      onFinished(key);
      return;
    }

    // check settings
    key = Settings.get(Settings.KEY);
    if (key) {
      onFinished(key);
      return;
    }

    // nothing found, set default key as current key
    Settings.set(Settings.KEY, defaultKey);
    onFinished(defaultKey);
  }).catch((error) => {
    console.error(error);
  });
};

export const getDefault = () => {
  return defaultKey;
};
