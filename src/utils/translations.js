import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import libConfig from '../app/config/lib';
import libTranslations from '../translations';

const createI118nInstance = (translations, options) => {
  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: 'en',
      debug: options.useDebugMode || false,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
        nsMode: 'fallback', // Enable seraching in multiple namespace
      },
      fallbackNS: [libConfig.key],
      resources: { // app namespaces translations + highlightsbcn-lib translations
        es: {
          ...translations.es,
          ...libTranslations.es, // highlightsbcn-lib translations as default fallback value
        },
        en: {
          ...translations.en,
          ...libTranslations.en, // highlightsbcn-lib translations as default fallback value
        },
      },
    });

  return i18n;
};

export {
  createI118nInstance,
};
