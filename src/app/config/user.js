const LANGUAGE = {
  EN: {
    key: 'en',
    label: 'EN',
  },
  ES: {
    key: 'es',
    label: 'ES',
  },
};

const DEFAULT_LANGUAGE = LANGUAGE.EN;

const DEFAULT_HIDE_BALANCES = false;

const userConfig = {
  LANGUAGE,
  LANGUAGES: Object.values(LANGUAGE),
  DEFAULT_LANGUAGE,
  DEFAULT_HIDE_BALANCES,
};

export default userConfig;
