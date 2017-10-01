import Language from './language';

const Strings = Object.freeze({
  SEARCH_ADDRESS : 0
});

// lut for strings in different language
var dictionary = [];

dictionary[Language.SV] = [];
var dict = dictionary[Language.SV];
dict[Strings.SEARCH_ADDRESS] = 'Sök efter adress...'

dictionary[Language.EN] = [];
dict = dictionary[Language.EN];
dict[Strings.SEARCH_ADDRESS] = 'Search for address...';

var language = Language.SV;

export const setLanguage = (lang) => {
  if (lang >= Language.EN && lang <= Language.SV) {
    language = lang;
  }
};

export const getString = (id) => {
  if (language !== undefined
    && id >= Strings.SEARCH_ADDRESS
    && id <= Strings.SEARCH_ADDRESS
  ) {
    return dictionary[language][id];
  }
};

export default Strings;
