const JWT = require('jsonwebtoken');
const fs = require('fs');
const dateHelper = require('../../../helpers/date.helper');
const CONFIG = require('../../../config/app');

// TODO: error callback
const privateKey = fs.readFileSync(CONFIG.CERTS.PRIVATE_PATH, CONFIG.CERTS.CHARSET);

export default () => {
  const jwt = (token, sub = '', scope = '') => JWT.sign({
    iss: CONFIG.APP_DOMAIN || CONFIG.APP_NAME,
    aud: token.client_id,
    jti: token.id,
    iat: dateHelper.getUnixTime(token.created_at),
    exp: dateHelper.getUnixTime(token.expires_at),
    sub,
    scope,
  }, privateKey, { algorithm: CONFIG.ENCRYPTION.ALGORITHM });

  return { jwt };
};
