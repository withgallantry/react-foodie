import 'babel-polyfill/dist/polyfill';

function* range (begin, end, interval = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i;
  }
};

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

export const getTemplateItems = () => {
  return [{"name":"Stockholm Pizza","address":"Scheelegatan 15, 112 28 Stockholm","hours":{"closesAt":{"minutes":"30","hours":"22"},"opensAt":{"minutes":"00","hours":"10"}},"tags":["Pizza","Kebab","Sallad","Gyros"],"menu":{"sv":[{"name":"Kebab","items":[{"name":"Kebabtallrik","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","price":"90 SEK"},{"name":"Kebabrulle","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd.","price":"90 SEK"},{"name":"Kebabsallad","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","price":"90 SEK"}]},{"name":"Kyckling","items":[{"name":"Kycklingtallrik","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","price":"90 SEK"},{"name":"Kycklingrulle","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd.","price":"90 SEK"},{"name":"Kycklingsallad","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","price":"90 SEK"}]},{"name":"Gyros","items":[{"name":"Gyrostallrik","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","price":"90 SEK"},{"name":"Gyrosrulle","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd.","price":"90 SEK"},{"name":"Gyrossallad","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","price":"90 SEK"}]},{"name":"Pizza","items":[{"price":"80 SEK","desc":"Tomatsås, ost och skinka.","name":"Vesuvio"},{"price":"90 SEK","desc":"Tomatsås, ost, skinka och räkor.","name":"Bussola"},{"price":"90 SEK","desc":"Tomatsås, ost, skinka och champinjoner.","name":"Capricciosa"},{"price":"80 SEK","desc":"Tomatsås, ost och skinka (Inbakad).","name":"Calzone "}]}],"en":[{"name":"Kebab","items":[{"name":"Kebab plate","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","price":"90 SEK"},{"name":"Kebab roll","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","price":"90 SEK"},{"name":"Kebab salad","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","price":"90 SEK"}]},{"name":"Chicken","items":[{"name":"Chicken plate","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","price":"90 SEK"},{"name":"Chicken roll","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","price":"90 SEK"},{"name":"Chicken salad","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","price":"90 SEK"}]},{"name":"Gyros","items":[{"name":"Gyros plate","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","price":"90 SEK"},{"name":"Gyros roll","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","price":"90 SEK"},{"name":"Gyros salad","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","price":"90 SEK"}]},{"name":"Pizza","items":[{"price":"80 SEK","desc":"Tomato sauce, cheese and ham.","name":"Vesuvio"},{"price":"90 SEK","desc":"Tomato sauce, cheese, ham and shrimps.","name":"Bussola"},{"price":"90 SEK","desc":"Tomato sauce, cheese, ham and mushrooms.","name":"Capricciosa"},{"price":"80 SEK","desc":"Tomato sauce, cheese and ham (baked).","name":"Calzone "}]}]},"images":{"banner":"banner26.png","gallery":"gallery28.png"}},{"name":"Stockholm Kebab","address":"Sankt Eriksgatan 30, 112 39, Stockholm","hours":{"closesAt":{"minutes":"00","hours":"21"},"opensAt":{"minutes":"00","hours":"11"}},"tags":["Pizza","Kebab","Sallad","Gyros"],"menu":{"sv":[{"name":"Kebab","items":[{"name":"Kebabtallrik","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","price":"90 SEK"},{"name":"Kebabrulle","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd.","price":"90 SEK"},{"name":"Kebabsallad","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","price":"90 SEK"}]},{"name":"Kyckling","items":[{"name":"Kycklingtallrik","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","price":"90 SEK"},{"name":"Kycklingrulle","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd.","price":"90 SEK"},{"name":"Kycklingsallad","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","price":"90 SEK"}]},{"name":"Gyros","items":[{"name":"Gyrostallrik","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås med pommes.","price":"90 SEK"},{"name":"Gyrosrulle","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås i pizzabröd.","price":"90 SEK"},{"name":"Gyrossallad","desc":"Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","price":"90 SEK"}]},{"name":"Pizza","items":[{"price":"80 SEK","desc":"Tomatsås, ost och skinka.","name":"Vesuvio"},{"price":"90 SEK","desc":"Tomatsås, ost, skinka och räkor.","name":"Bussola"},{"price":"90 SEK","desc":"Tomatsås, ost, skinka och champinjoner.","name":"Capricciosa"},{"price":"80 SEK","desc":"Tomatsås, ost och skinka (Inbakad).","name":"Calzone "}]}],"en":[{"name":"Kebab","items":[{"name":"Kebab plate","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","price":"90 SEK"},{"name":"Kebab roll","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","price":"90 SEK"},{"name":"Kebab salad","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","price":"90 SEK"}]},{"name":"Chicken","items":[{"name":"Chicken plate","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","price":"90 SEK"},{"name":"Chicken roll","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","price":"90 SEK"},{"name":"Chicken salad","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","price":"90 SEK"}]},{"name":"Gyros","items":[{"name":"Gyros plate","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","price":"90 SEK"},{"name":"Gyros roll","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","price":"90 SEK"},{"name":"Gyros salad","desc":"Gyros, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","price":"90 SEK"}]},{"name":"Pizza","items":[{"price":"80 SEK","desc":"Tomato sauce, cheese and ham.","name":"Vesuvio"},{"price":"90 SEK","desc":"Tomato sauce, cheese, ham and shrimps.","name":"Bussola"},{"price":"90 SEK","desc":"Tomato sauce, cheese, ham and mushrooms.","name":"Capricciosa"},{"price":"80 SEK","desc":"Tomato sauce, cheese and ham (baked).","name":"Calzone "}]}]},"images":{"banner":"banner0.png","gallery":"gallery0.png"}}]
};
