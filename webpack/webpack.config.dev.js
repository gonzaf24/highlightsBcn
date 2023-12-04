/* eslint-disable no-param-reassign */
const baseConfig = require('./webpack.config.base');

module.exports = function override(config, env) {
  // Load base webpack config
  config = baseConfig(config, env); // CRA + base config

  // Update with development config
  config.plugins = [
    ...config.plugins,
  ];

  return config; // CRA + base config + dev config
};
