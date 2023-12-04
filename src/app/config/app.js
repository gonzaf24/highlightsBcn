const TOASTS = {
  TYPES: {
    DEFAULT: 'DEFAULT',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING',
  },
  DEFAULT_OPTIONS: {
    hideDelay: 7000,
    useAutoHide: true,
    showCloseIcon: false,
  },
};

const LOCAL_STORAGE = {
  ACCESS_TOKEN: '_highlightsbcn_token_',
  REFRESH_TOKEN: '_highlightsbcn_refresh_token_',
  REMEMBER_ME: '_highlightsbcn_remember_me_',
  REMEMBER_ME_EMAIL: '_highlightsbcn_remember_me_email_',
  HIGHLIGHTS_BCN_USER: '_highlightsbcn_user_',
  HIGHLIGHTS_BCN_TEAM: '_highlightsbcn_team_',
};

const appConfig = {
  APP_NAME: process.env.REACT_APP_NAME,
  key: 'app',
  TOASTS,
  LOCAL_STORAGE,
  HIGHLIGHTSBCN_UNAUHORIZED_EVENT: 'highlightsbcn-unauthorized',
};

export default appConfig;
