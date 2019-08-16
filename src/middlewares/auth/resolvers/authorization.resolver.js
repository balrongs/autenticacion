import Helpers from '../../../helpers';
import ERRORS from '../../../config/constants/errors';
import CODES from '../../../config/constants/codes';

const Oauth = require('../../../config/oauth');

const { stringHelper, objectHelper } = Helpers();

module.exports = ctx => {
  if (objectHelper.isSet(ctx.header) && stringHelper.isSet(ctx.header.authorization)) {
    const parts = ctx.header.authorization.split(' ');

    if (parts.length === 2) {
      const tokenType = parts.shift().toLowerCase();
      const token = parts.shift();

      if (tokenType === Oauth.TOKEN_TYPE.toLowerCase()) {
        return token;
      }
    }
    ctx.code = ERRORS.OAUTH.INVALID_AUTH_FORMAT.CODE;
    ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.OAUTH.INVALID_AUTH_FORMAT.MESSAGE);
  }

  ctx.code = ERRORS.GENERAL.UNAUTHORIZED;
  ctx.throw(CODES.HTTP.UNAUTHORIZED, '');
};
