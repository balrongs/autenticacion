import Validator from 'fastest-validator';
import UniqueResolver from './resolvers/unique.resolver';
import UUIDResolver from './resolvers/uuid.resolver';
import CODES from '../config/constants/codes';

export default async (ctx, schema, params, fn) => {
  const validator = new Validator();
  const check = validator.compile(schema);
  const validationResult = check(params);

  if (
    validationResult === true
    && UUIDResolver(ctx, schema, params)
    && await UniqueResolver(ctx, schema, params)
  ) {
    return fn(ctx);
  }

  ctx.throw(CODES.HTTP.BAD_REQUEST, validationResult.shift().message);
};
