import Validator from 'fastest-validator';
import Schema from '../schemas/token';
import Error from './error';
import CODES from '../config/constants/codes';
import ERRORS from '../config/constants/errors';

const strHelper = require('../helpers/string.helper');

const schema = Schema();

export default async (ctx, fn) => {
  const validator = new Validator();
  const handler = Error(ctx);
  const grantType = ctx.request.body.grant_type;

  if (!strHelper.isSet(grantType)) ctx.throw(CODES.HTTP.BAD_REQUEST, handler.param('grant_type'));

  let check;
  switch (grantType) {
    case 'password':
      check = validator.compile(schema.issue_password);
      break;
    case 'refresh_token':
      check = validator.compile(schema.issue_refresh);
      break;
    case 'client_credentials':
      check = validator.compile(schema.issue_client);
      break;
    case 'authorization_code':
      ctx.code = ERRORS.VALIDATIONS.UNSUPPORTED_GRANT_TYPE.CODE;
      ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.VALIDATIONS.UNSUPPORTED_GRANT_TYPE.MESSAGE);
      break;
    default:
      ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.VALIDATIONS.UNKNOW_GRANT_TYPE.MESSAGE);
  }

  const validationResult = check(ctx.request.body);

  if (validationResult === true) {
    return fn(ctx);
  }

  ctx.throw(CODES.HTTP.BAD_REQUEST, validationResult.shift().message);
};
