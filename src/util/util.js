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

export const getTemplateItems = () => {
  return [{"name":"Stockholm Pizza","address":"Scheelegatan 15, 112 28 Stockholm","hours":["10.00","21.00"],"tags":["Pizza","Kebab","Sallad"],"menu":{"sv":[{"name":"Kyckling","items":[{"price":"90 SEK","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås, vitlökssås och pommes.","name":"Kycklingtallrik"},{"price":"90 SEK","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås, vitlökssås i pizzabröd.","name":"Kycklingrulle"},{"price":"90 SEK","desc":"Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","name":"Kycklingsallad"}]},{"name":"Kebab","items":[{"price":"90 SEK","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås, vitlökssås och pommes.","name":"Kebabtallrik"},{"price":"90 SEK","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås, vitlökssås i pizzabröd.","name":"Kebabrulle"},{"price":"90 SEK","desc":"Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås.","name":"Kebabsallad"}]}],"en":[{"name":"Chicken","items":[{"price":"90 SEK","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","name":"Chicken plate"},{"price":"90 SEK","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","name":"Chicken roll"},{"price":"90 SEK","desc":"Chicken, salad, tomato, onion, fefferoni, tomato sauce and garlic sauce.","name":"Chicken salad"}]},{"name":"Kebab","items":[{"price":"90 SEK","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce and french fries.","name":"Kebab plate"},{"price":"90 SEK","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce in pizza bread.","name":"Kebab roll"},{"price":"90 SEK","desc":"Kebab, salad, tomato, onion, fefferoni, tomato sauce, garlic sauce.","name":"Kebab salad"}]}]},"images":{"gallery":"img/gallery.png","banner":"img/banner.png"}}]
};
