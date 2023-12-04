const ENV_NAME = process.env.REACT_APP_ENV_NAME;
const { NODE_ENV } = process.env;

// Build types
const NODE_ENVS = {
  DEV: 'development',
  PROD: 'production',
};

// Environments
const AVAILABLE_ENVS = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
};

const envConfig = {
  NODE_ENV,
  DEBUG: NODE_ENV === NODE_ENVS.DEV,
  ENV_NAME,
  IS_LOCAL: ENV_NAME === AVAILABLE_ENVS.LOCAL,
  IS_DEVELOPMENT: ENV_NAME === AVAILABLE_ENVS.DEVELOPMENT,
  IS_STAGING: ENV_NAME === AVAILABLE_ENVS.STAGING,
  IS_PRODUCTION: ENV_NAME === AVAILABLE_ENVS.PRODUCTION,
};

export default envConfig;
