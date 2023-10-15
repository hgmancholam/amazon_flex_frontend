const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  es: () => import("./es.json").then((module) => module.default),
};

export const getDictionary = async (lang) => {
  const x = !lang ? "es" : lang;
  const dictionaryLoader = dictionaries[x];

  const dictionary = await dictionaryLoader();
  return dictionary;
};
