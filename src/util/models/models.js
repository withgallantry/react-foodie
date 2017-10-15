import { cloneDeep } from '../util';
import { Store } from './store';

export const STORE = 0;

const min = 0;
const max = STORE;

let models = [];
models[STORE] = () => { return cloneDeep(Store) }

export const get = (model) => {
  if (!isNaN(model) && model >= min && model <= max) {
    return models[model]();
  }
}
