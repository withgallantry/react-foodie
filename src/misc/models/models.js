import { cloneDeep } from '../util';
import { Store } from './store';
import * as Debug from '../debug';
import * as Settings from '../settings';

export const STORE = 0;

const MIN = STORE;
const MAX = STORE;

let models = [];
models[STORE] = () => { return cloneDeep(Store) }

export const get = (model) => {
  if (!isNaN(model) && model >= MIN && model <= MAX) {
    return models[model]();
  }
  Debug.log(`missing Models.${model}`);
};
