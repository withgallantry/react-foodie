const Language = Object.freeze({
  SV : 'sv',
  EN : 'en',
});

let language = Language.SV;

export const setLanguage = (lang) => {
  if (lang >= Language.EN && lang <= Language.SV) {
    language = lang;
  }
};

export const getLanguage = () => {
  return language;
};

export const getLanguages = () => {
  return [Language.SV, Language.EN];
};

export default Language;
