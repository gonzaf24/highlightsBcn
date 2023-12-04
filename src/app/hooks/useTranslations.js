import { useCallback, useContext, useMemo } from 'react';
import { I18nContext, useTranslation } from 'react-i18next';

import languageConfig from '../config/language';

const useTranslations = (keys = []) => {
  // console.log('keys i18n', keys);
  const { i18n: contextI18n } = useContext(I18nContext);

  const defaultNamespaces = useMemo(() => {
    const namespaces = Object.values(contextI18n?.store?.data).reduce((allNamespaces, language) => [
      ...allNamespaces,
      ...Object.keys(language),
    ], []);
    return namespaces.filter((ns, index, nsList) => nsList.indexOf(ns) === index);
  }, [contextI18n?.store?.data]);

  const switchLanguage = useCallback(() => {
    const language = languageConfig.LANGUAGE_FALLBACK_MAPPING[contextI18n.language] || languageConfig.DEFAULT_LANGUAGE;
    if (language === languageConfig.AVAILABLE_LANGUAGES.EN) contextI18n.changeLanguage(languageConfig.AVAILABLE_LANGUAGES.ES);
    else contextI18n.changeLanguage(languageConfig.AVAILABLE_LANGUAGES.EN);
  }, [contextI18n]);

  const uniqueNamespaces = [...keys, ...defaultNamespaces].filter((ns, index, nsList) => nsList.indexOf(ns) === index);
  // console.log('uniqueNamespaces i18n', uniqueNamespaces);
  const { t, i18n, ready } = useTranslation(uniqueNamespaces); // Search in custom namespace keys by order and then in all declared namespaces

  return {
    t,
    i18n,
    ready,
    language: i18n.language,
    switchLanguage,
    setLanguage: i18n.changeLanguage,
  };
};

export default useTranslations;
