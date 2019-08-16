import CODES from '../../config/constants/codes';
import ERRORS from '../../config/constants/errors';
import issueMethods from './methods/issue.method';

const Models = require('../../models');

const { AccessToken, RefreshToken } = Models;

export default () => {
  const token = {};

  token.issue = async ctx => {
    const {
      verifyClient,
      verifyUser,
      parseResponse,
      verifyRefresh,
      getScopes,
    } = issueMethods(ctx);
    const req = ctx.request.body;

    const client = await verifyClient(req.client_id, req.client_secret);

    let userId = null;
    switch (req.grant_type) {
      case 'refresh_token':
        userId = await verifyRefresh(req.refresh, client.id);
        break;
      case 'password':
        userId = await verifyUser(req.username, req.password);
        break;
      case 'client_credentials':
        break;

      default:
        ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.VALIDATIONS.UNKNOW_GRANT_TYPE.MESSAGE);
        break;
    }

    ctx.response.status = CODES.HTTP.CREATED;
    return AccessToken
      .create({ client_id: client.id, user_id: userId })
      .then(async access => {
        const refresh = await RefreshToken.create({ access_token_id: access.id });
        const scopes = await getScopes(userId);
        return parseResponse(access, refresh, userId, scopes);
      });
  };

  return token;
};
