import * as Language from './language';
import * as Settings from '../settings';

export const SEARCH_ADDRESS = 0;
export const FILTER         = 1;
export const SEARCH         = 2;
export const SEARCH_STORE   = 3;
export const CLOSED         = 4;
export const EDITOR         = 5;
export const GO_TO_ORDER    = 6;
export const ORDER_FROM     = 7;
export const SUB_TOTAL      = 8;
export const DELIVERY_FEE   = 9;
export const TOTAL          = 10;
export const DELIVERING     = 11;
export const DELIVERY       = 12;
export const PICKUP         = 13;
export const ORDER_MISSING  = 14;

const MIN = 0;
const MAX = ORDER_MISSING;

// lut for strings in different language
let dictionary = [];

dictionary[Language.SV] = [];
let dict = dictionary[Language.SV];
dict[SEARCH_ADDRESS]  = 'Sök efter adress...';
dict[FILTER]          = 'Filtrera';
dict[SEARCH]          = 'Sök';
dict[SEARCH_STORE]    = 'Sök efter restaurang & taggar...';
dict[CLOSED]          = 'Stängd';
dict[EDITOR]          = 'Editor';
dict[GO_TO_ORDER]     = 'Gå till senaste modifierade order';
dict[ORDER_FROM]      = 'Din beställning från';
dict[SUB_TOTAL]       = 'Delsumma';
dict[DELIVERY_FEE]    = 'Leveransavgift';
dict[TOTAL]           = 'Totalt';
dict[DELIVERING]      = 'Levererar till';
dict[DELIVERY]        = 'Leverans';
dict[PICKUP]          = 'Pick-up';
dict[ORDER_MISSING]   = 'Din varukorg är tom! Börja lägga till dina favoriträtter.';

dictionary[Language.EN] = [];
dict = dictionary[Language.EN];
dict[SEARCH_ADDRESS]  = 'Search for address...';
dict[FILTER]          = 'Filter';
dict[SEARCH]          = 'Search';
dict[SEARCH_STORE]    = 'Search for store & tags...';
dict[CLOSED]          = 'Closed';
dict[EDITOR]          = 'Editor';
dict[GO_TO_ORDER]     = 'Go to latest modified order';
dict[ORDER_FROM]      = 'Your order from';
dict[SUB_TOTAL]       = 'Subtotal';
dict[DELIVERY_FEE]    = 'Delivery fee';
dict[TOTAL]           = 'Total';
dict[DELIVERING]      = 'Delivering to';
dict[DELIVERY]        = 'Delivery';
dict[PICKUP]          = 'Pick-up';
dict[ORDER_MISSING]   = 'You haven’t added anything to your cart yet! Start adding your favourite dishes.';

const Tags = Object.freeze({
  SALAD : 0
});

// lut for tags in different language
let tags = [];
tags[Language.SV] = [];
let t = tags[Language.SV];
t[Tags.SALAD] = 'Sallad';

tags[Language.EN] = [];
t = tags[Language.EN];
t[Tags.SALAD] = 'Salad';

// localizes strings
// (looks in Strings and Tags for a match)
// lang = input language
// target = target input language
export const localize = (args, lang, target = Settings.get(Settings.LANGUAGE)) => {
  let result = [];
  let isArray = true;
  if (args.constructor !== Array) {
    isArray = false;
    args = [args];
  }
  for (let i = 0; i < args.length; ++i) {
    const value = args[i].toLowerCase();
    let match = false;
    for (let j = 0; j < dictionary[lang].length; ++j) {
      if (dictionary[lang][j].toLowerCase().localeCompare(value) === 0) {
        match = true;
        result.push(dictionary[target][j]);
        break;
      }
    }
    if (! match) {
      for (let j = 0; j < tags[lang].length; ++j) {
        if (tags[lang][j].toLowerCase().localeCompare(value) === 0) {
          match = true;
          result.push(tags[target][j]);
          break;
        }
      }
    }
    if (! match) {
      result.push(args[i]);
    }
  }

  if (! isArray) {
    return result[0];
  }
  return result;
};

export const get = (id) => {
  const lang = Settings.get(Settings.LANGUAGE);
  if (lang !== undefined
    && id >= MIN
    && id <= MAX
  ) {
    return dictionary[lang][id];
  }
};
