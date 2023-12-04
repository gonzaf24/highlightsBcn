/* eslint-disable no-param-reassign */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const { WebpackError } = require('webpack');

// Environment selection
const ENVS_PATH = path.resolve(__dirname, '../envs');
const AVAILABLE_ENV_NAMES = ['local', 'development', 'staging', 'production'];

const checkEnv = () => {
  const env = process.env.REACT_APP_ENV_NAME;
  const envFilePath = path.resolve(ENVS_PATH, `${env}.env`);

  if (!env) {
    throw new WebpackError(`
ERROR: No environment file provided.
Please select an available environment using the 'dotenv -e <env-file-path>' command.
You can check or create new environment files in '${ENVS_PATH}' folder placed ath the project root level.
    `);
  }

  if (!AVAILABLE_ENV_NAMES.includes(env)) {
    throw new WebpackError(`
ERROR: Environment name provided is not in the available environment list.
You can check or create new environment files in '${ENVS_PATH}' folder placed at the project root level.
    `);
  }

  if (!fs.existsSync(envFilePath)) {
    throw new WebpackError(`
ERROR: No environment file found at '${envFilePath}'.
You can check or create new environment files in '${ENVS_PATH}' folder placed at the project root level.
    `);
  }
};

module.exports = function override(config, _env) {
  console.info('Overriding default React Webpack config (from CRA)...');

  // Check that the selected environment name is available and the file with environment variables exists
  checkEnv();

  // Update with base config
  config.resolve.alias = {
    app: path.resolve(__dirname, '../src/app'),
    assets: path.resolve(__dirname, '../src/assets'),
    base: path.resolve(__dirname, '../src/base'),
    modules: path.resolve(__dirname, '../src/modules'),
    utils: path.resolve(__dirname, '../src/utils'),
    styles: path.resolve(__dirname, '../src/styles'),
  };
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    tls: false,
    net: false,
    // "zlib": require.resolve("browserify-zlib") ,
    // "path": require.resolve("path-browserify"),
    util: require.resolve('util/'),
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify/browser'),
    // This handles all of them…
    // ...Object.fromEntries(Object.entries(require("node-libs-browser")).filter(e => e[1] !== null)),
    // … but these are likely the most used and as such should be sufficient
    // process: require('node-libs-browser').process,
    // buffer: require('node-libs-browser').buffer,
  };
  config.resolve.extensions = [...config.resolve.extensions, '.js', '.jsx'];
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  return config;
};
