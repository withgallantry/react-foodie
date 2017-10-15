// Middle layer for mongoose db in back end. Uses the current key which is
// set in settings if needed.
import axios from 'axios';

import * as Constants from './constants';
import * as Settings from './settings';

const getUrl = (id, key) => {
  const url = Constants.STORES_URL;
  if (id !== undefined) {
    if (key !== undefined) {
      return `${url}/${key}/${id}`;
    } else {
      return `${url}/${id}`;
    }
  } else {
    if (key !== undefined) {
      return `${url}/${key}`;
    } else {
      return url;
    }
  }
};

export const get = (id) => {
  return axios.get(
    getUrl(undefined, Settings.get(Settings.KEY)), { params : { id }});
};

export const getAll = () => {
  return axios.get(getUrl(undefined, Settings.get(Settings.KEY)));
}

export const add = (store) => {
  return axios.post(getUrl(undefined, Settings.get(Settings.KEY)), store);
};

export const update = (id, store) => {
  return axios.put(getUrl(id), store);
};

export const remove = (id) => {
  return axios.delete(getUrl(id));
};

export const removeAll = () => {
  return axios.delete(`${getUrl(undefined, Settings.get(Settings.KEY))}/deleteAll`);
};
