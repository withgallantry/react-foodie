import Language, { getLanguage } from './language';

const Strings = Object.freeze({
  SEARCH_ADDRESS  : 0,
  FILTER          : 1,
  SEARCH          : 2,
  SEARCH_STORE    : 3,
  CLOSED          : 4,
  EDITOR          : 5,
});

const min = 0;
const max = Object.keys(Strings).length - 1;

// lut for strings in different language
let dictionary = [];

dictionary[Language.SV] = [];
let dict = dictionary[Language.SV];
dict[Strings.SEARCH_ADDRESS]  = 'Sök efter adress...';
dict[Strings.FILTER]          = 'Filtrera';
dict[Strings.SEARCH]          = 'Sök';
dict[Strings.SEARCH_STORE]    = 'Sök efter restaurang & taggar...';
dict[Strings.CLOSED]          = 'Stängd';
dict[Strings.EDITOR]          = 'Editor';

dictionary[Language.EN] = [];
dict = dictionary[Language.EN];
dict[Strings.SEARCH_ADDRESS]  = 'Search for address...';
dict[Strings.FILTER]          = 'Filter';
dict[Strings.SEARCH]          = 'Search';
dict[Strings.SEARCH_STORE]    = 'Search for store & tags...';
dict[Strings.CLOSED]          = 'Closed';
dict[Strings.EDITOR]          = 'Editor';

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

// localize strings to current language,
// (looks in Strings and Tags for a match)
// lang = input language
export const localize = (args, lang) => {
  let result = [];
  let isArray = true;
  if (args.constructor !== Array) {
    isArray = false;
    args = [args];
  }
  const currentLang = getLanguage();
  for (let i = 0; i < args.length; ++i) {
    const value = args[i].toLowerCase();
    let match = false;
    for (let j = 0; j < dictionary[lang].length; ++j) {
      if (dictionary[lang][j].toLowerCase().localeCompare(value) === 0) {
        match = true;
        result.push(dictionary[currentLang][j]);
        break;
      }
    }
    if (! match) {
      for (let j = 0; j < tags[lang].length; ++j) {
        if (tags[lang][j].toLowerCase().localeCompare(value) === 0) {
          match = true;
          result.push(tags[currentLang][j]);
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

export const getString = (id) => {
  const lang = getLanguage();
  if (lang !== undefined
    && id >= min
    && id <= max
  ) {
    return dictionary[lang][id];
  }
};

export default Strings;
