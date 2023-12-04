import { EnglandFlagIcon, SpainFlagIcon } from 'assets/icons';

const AVAILABLE_LANGUAGES = {
  EN: 'en',
  ES: 'es',
  EN_US: 'en_US',
  ES_ES: 'es_ES',
};

const LANGUAGE_FALLBACK_MAPPING = {
  [AVAILABLE_LANGUAGES.EN]: 'en',
  [AVAILABLE_LANGUAGES.ES]: 'es',
  [AVAILABLE_LANGUAGES.EN_US]: 'en',
  [AVAILABLE_LANGUAGES.ES_ES]: 'es',
};

const DEFAULT_LANGUAGE = AVAILABLE_LANGUAGES.EN;

const LANGUAGE = {
  EN: {
    key: 'en',
    label: 'EN',
    icon: EnglandFlagIcon,
  },
  ES: {
    key: 'es',
    label: 'ES',
    icon: SpainFlagIcon,
  },
};

const languageConfig = {
  LANGUAGE,
  LANGUAGES: Object.values(LANGUAGE),
  AVAILABLE_LANGUAGES,
  LANGUAGE_FALLBACK_MAPPING,
  DEFAULT_LANGUAGE,
};

export default languageConfig;
