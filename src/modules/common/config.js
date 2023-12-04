const REGEX_PATTERNS = {
  EMAIL_FORMAT: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  HAS_LETTERS: /[a-zA-Z]/,
  HAS_NUMBERS: /[0-9]/,
  HAS_WHITESPACE: /\s/,
  HAS_SPECIAL_CHARACTERS: /[^a-zA-Z0-9]/,
};

const EXTERNAL_URLS = {
  // TODO: Replace with your the terms and conditions URL
  ACCEPT_TERMS: 'https://www.google.com',
};

const commonModuleConfig = {
  name: 'Common',
  key: 'common',
  REGEX_PATTERNS,
  EXTERNAL_URLS,
};

export default commonModuleConfig;
