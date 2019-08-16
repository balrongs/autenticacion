import CODES from '../../../config/constants/codes';
import ERRORS from '../../../config/constants/errors';
import OAuth from '../../../config/oauth';
import Helpers from '../../../helpers';
import Encrypt from './encrypt';

const bcrypt = require('bcrypt');
const Models = require('../../../models');

const {
  Client,
  User,
  Password,
  AccessToken,
  RefreshToken,
  Scope,
} = Models;
const { dateHelper, objectHelper } = Helpers();
const { jwt } = Encrypt();

export default (ctx) => {
  const verifyClient = async (id, secret) => {
    return Client
      .findOne({ where: { id, secret } })
      .then(c => {
        if (!objectHelper.isSet(c)) {
          ctx.code = ERRORS.OAUTH.INVALID_CLIENT.CODE;
          ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.INVALID_CLIENT.MESSAGE);
        }
        return c;
      });
  };

  const verifyUser = async (email, password) => {
    return User
      .findOne({
        include: [{ model: Password, required: true }],
        where: { email: email.toLowerCase() },
        order: [[Password, 'created_at', 'desc']],
        paranoid: false,
      })
      .then(async userResponse => {
        if (objectHelper.isSet(userResponse)) {
          if (!await bcrypt.compare(password, userResponse.Passwords.shift().password)) {
            const old = await userResponse.Passwords;
            const passwordChecker = old.map(async p => {
              if (await bcrypt.compare(password, p.password)) {
                ctx.code = ERRORS.OAUTH.OLD_CREDENTIALS.CODE;
                ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.OLD_CREDENTIALS.MESSAGE);
              }
              return p;
            });

            await Promise.all(passwordChecker);
            ctx.code = ERRORS.OAUTH.INVALID_CREDENTIALS.CODE;
            ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.INVALID_CREDENTIALS.MESSAGE);
          }

          if (dateHelper.isSet(userResponse.deleted_at)) {
            ctx.code = ERRORS.OAUTH.ACCOUNT_DELETED.CODE;
            ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.ACCOUNT_DELETED.MESSAGE);
          }
          return userResponse.id;
        }
      });
  };

  const verifyRefresh = async (refresh, clientId) => {
    return RefreshToken
      .scope('valid')
      .findOne({
        include: [{
          model: AccessToken,
          where: { revoked_at: null },
          include: [{ model: Client, where: { id: clientId } }],
        }],
        where: { id: refresh },
      }).then(r => {
        if (!objectHelper.isSet(r)) {
          ctx.code = ERRORS.OAUTH.INVALID_REFRESH.CODE;
          ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.INVALID_REFRESH.MESSAGE);
        }
        return r.AccessToken.user_id;
      });
  };

  const getScopes = async userId => {
    const scopesResponse = await User.findOne({
      include: [{ model: Scope }],
      where: { id: userId },
    }).then(user => user.Scopes.map(scope => scope.dataValues));

    return scopesResponse.reduce((scopes, scope) => {
      return `${scopes} ${scope.name}`;
    }, '').trim();
  };

  const parseResponse = async (token, refresh, userId = null, scope = null) => {
    return {
      access_token: jwt(token, userId, scope),
      token_type: OAuth.TOKEN_TYPE,
      expires_in: token.expires,
      refresh_token: refresh.id,
      scope,
    };
  };

  return {
    verifyClient,
    verifyUser,
    parseResponse,
    verifyRefresh,
    getScopes,
  };
};
