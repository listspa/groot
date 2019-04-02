import {TRANSLATIONS_BY_LANG} from './groot-translations';

describe('Groot builtin translations', () => {
  it('all languages should contain all the translations', () => {
    const languages = Object.keys(TRANSLATIONS_BY_LANG);

    // First pass: find all the labels
    const keys = new Set<string>();
    languages.forEach(lang => {
      const translations = TRANSLATIONS_BY_LANG[lang];
      Object.keys(translations).forEach(k => keys.add(k));
    });

    // Second pass: find the missing labels in any language
    languages.forEach(lang => {
      const translations = TRANSLATIONS_BY_LANG[lang];
      keys.forEach(key => {
        if (!translations.hasOwnProperty(key)) {
          throw new Error(`translation "${key}" is missing in language ${lang}`);
        }
      });
    });
  });
});
