module.exports = {
  DEFAULT_PORT: 3001,

  APP_NAME: 'Montt-Auth Service',

  APP_DOMAIN: process.env.AUTH_APP_DOMAIN || 'http://localhost',

  ENCRYPTION: {
    SALT: 10,
    ALGORITHM: 'RS256',
  },

  UUID_VERSION: 4,

  CERTS: {
    PRIVATE_PATH: './cert/dev/private.key',
    PUBLIC_PATH: './cert/dev/public.key',
    CHARSET: 'utf8',
  },

  SCOPE_PREFIX: 'users',
};
