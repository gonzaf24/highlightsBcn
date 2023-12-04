const securityConfig = {
  HTTPS: Boolean(process.env.REACT_APP_HTTPS),
  SSL_CRT_FILE: process.env.REACT_APP_SSL_CRT_FILE,
  SSL_KEY_FILE: process.env.REACT_APP_SSL_KEY_FILE,
  GENERATE_SOURCEMAP: Boolean(process.env.REACT_APP_GENERATE_SOURCEMAP),
};

export default securityConfig;
