import { cloneDeep } from '../util';
import { Store } from './store';

export const STORE = 0;

const MIN = 0;
const MAX = STORE;

let models = [];
models[STORE] = () => { return cloneDeep(Store) }

export const get = (model) => {
  if (!isNaN(model) && model >= MIN && model <= MAX) {
    return models[model]();
  }
}
