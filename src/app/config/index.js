import app from './app';
import env from './env';
import decodeJwtPayload from './jwtDecoder';
import language from './language';
import lib from './lib';
import routing from './routing';
import security from './security';
import user from './user';

const config = {
  app,
  env,
  routing,
  security,
  language,
  lib,
  user,
  decodeJwtPayload,
};

export default config;
