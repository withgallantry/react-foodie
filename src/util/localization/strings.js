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
var dictionary = [];

dictionary[Language.SV] = [];
var dict = dictionary[Language.SV];
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

export const getString = (id) => {
  var lang = getLanguage();
  if (lang !== undefined
    && id >= min
    && id <= max
  ) {
    return dictionary[lang][id];
  }
};

export default Strings;
