const Language = Object.freeze({
  SV : 'sv',
  EN : 'en',
});

var language = Language.SV;

export const setLanguage = (lang) => {
  if (lang >= Language.EN && lang <= Language.SV) {
    language = lang;
  }
};

export const getLanguage = () => {
  return language;
};

export default Language;
