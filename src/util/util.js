import 'babel-polyfill/dist/polyfill';

export const generateKey = () => {
  return Math.random().toString(36).substr(2, 9);
}

export const removeWhiteSpace = (str) => {
    return str.replace(/\s/g,'');
};

// NOTE : This method will also remove the keys from your object, which have
// functions as their values, because the JSON doesn't support functions.
// Date objects will also be converted back to UTC in the string representation
// in the ISO8601 format.
export const cloneDeep = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const replaceAt = (str, index, replacement) => {
  return str.substr(0, index) + replacement + str.substr(index + replacement.length);
};

export const getTemplateItems = () => {
  return [{"name":"Stockholm Pizza","address":"Scheelegatan 15, 112 28 Stockholm","hours":{"closesAt":{"hours":"22","minutes":"30"},"opensAt":{"hours":"10","minutes":"00"}},"tags":["Pizza","Kebab","Sallad"],"menu":{"sv":[{"name":"Kebab","items":[{"price":"90 SEK","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","name":"Kebabtallrik"},{"price":"90 SEK","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd","name":"Kebabrulle"},{"price":"90 SEK","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","name":"Kebabsallad"}]},{"name":"Kyckling","items":[{"price":"90 SEK","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","name":"Kycklingtallrik"},{"price":"90 SEK","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd","name":"Kycklingrulle"},{"price":"90 SEK","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","name":"Kycklingsallad"}]},{"name":"Gyros","items":[{"price":"90 SEK","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","name":"Gyrostallrik"},{"price":"90 SEK","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd","name":"Gyrosrulle"},{"price":"90 SEK","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","name":"Gyrossallad"}]}],"en":[{"name":"Kebab","items":[{"price":"90 SEK","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","name":"Kebab plate"},{"price":"90 SEK","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","name":"Kebab roll"},{"price":"90 SEK","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","name":"Kebab salad"}]},{"name":"Chicken","items":[{"price":"90 SEK","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","name":"Chicken plate"},{"price":"90 SEK","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","name":"Chicken roll"},{"price":"90 SEK","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","name":"Chicken salad"}]},{"name":"Gyros","items":[{"price":"90 SEK","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","name":"Gyros plate"},{"price":"90 SEK","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","name":"Gyros roll"},{"price":"90 SEK","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","name":"Gyros salad"}]}]},"images":{"gallery":"gallery28.png","banner":"banner7.png"}}]
};

export const sequence = (begin, end, interval = 1) => {
  let iter = range(begin, end, interval);
  let result = [];
  let next = null;
  do {
    next = iter.next();
    result.push(next.value);
  } while (! next.done);
  result.pop();
  return result;
};

function* range (begin, end, interval = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i;
  }
};
