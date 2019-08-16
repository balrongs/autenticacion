import validateUUID from 'uuid-validate';
import CODES from '../../config/constants/codes';
import MESSAGES from '../../config/constants/messages';

export default (ctx, schema, params) => {
  Object.keys(schema)
    .filter(key => schema[key].uuid)
    .map(key => {
      if (!validateUUID(params[key], schema[key].uuid)) {
        ctx.throw(CODES.HTTP.BAD_REQUEST, MESSAGES.VALIDATIONS.UUID);
      }
      return key;
    });

  return true;
};
