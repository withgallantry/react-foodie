import { cloneDeep } from '../util';
import { Store } from '../../models/store';

const Models = Object.freeze({
  STORE : 0
});

const min = 0;
const max = Object.keys(Models).length - 1;

let models = [];
models[Models.STORE] = () => {
  return cloneDeep(Store);
};

export const getModel = (model) => {
  if (!isNaN(model) && model >= min && model <= max) {
    return models[model]();
  }
}

export default Models;
