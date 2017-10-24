// Middle layer for mongoose db in back end.
import axios from 'axios';

import * as Url from './url';

export const get = (id) => {
  return axios.get(Url.get(Url.ROOT), { params : { id }});
};

export const getAll = () => {
  return axios.get(Url.get(Url.ROOT));
};

export const add = (store) => {
  return axios.post(Url.get(Url.ROOT), store);
};

export const update = (id, store) => {
  return axios.put(Url.get(Url.ROOT, id, false), store);
};

export const remove = (id) => {
  return axios.delete(Url.get(Url.ROOT, id, false));
};

export const removeAll = () => {
  return axios.delete(Url.get(Url.DELETE_ALL));
};

export const setTemplate = (stores) => {
  return axios.post(Url.get(Url.TEMPLATE, undefined, false), stores)
};

export const getTemplate = () => {
  return axios.get(Url.get(Url.TEMPLATE, undefined, false));
}

export const getDefaultKey = () => {
  return axios.get(Url.get(Url.DEFAULT_KEY, undefined, false));
}
