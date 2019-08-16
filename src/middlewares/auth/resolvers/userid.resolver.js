import CODES from '../../../config/constants/codes';
import ERRORS from '../../../config/constants/errors';

const JWT = require('jsonwebtoken');
const fs = require('fs');

const CONFIG = require('../../../config/app');
const authResolver = require('./authorization.resolver');

module.exports = async (ctx) => {
  const accessToken = authResolver(ctx);
  // TODO: error callback
  const publicKey = fs.readFileSync(CONFIG.CERTS.PUBLIC_PATH, CONFIG.CERTS.CHARSET);
  // TODO: verify audience & scopes
  return JWT.verify(accessToken, publicKey,
    { algorithms: [CONFIG.ENCRYPTION.ALGORITHM] }, (err, payload) => {
      if (err) {
        ctx.code = ERRORS.OAUTH.INVALID_TOKEN.CODE;
        ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.INVALID_TOKEN.MESSAGE);
      }
      return payload;
    });
};
