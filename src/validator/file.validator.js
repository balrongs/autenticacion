import RULES from '../config/constants/avatar';
import MimetypesResolver from './resolvers/mimetype.resolver';
import ERRORS from '../config/constants/errors';
import CODES from '../config/constants/codes';

const mimetypesResolver = MimetypesResolver();

export default async (ctx, file, fn) => {
  if (!file) {
    ctx.code = ERRORS.AVATAR.FILE_REQUIRED.CODE;
    ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.AVATAR.FILE_REQUIRED.MESSAGE);
  }

  if (file.size > RULES.MAX_AVATAR_SIZE) {
    ctx.code = ERRORS.AVATAR.FILE_SIZE.CODE;
    ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.AVATAR.FILE_SIZE.MESSAGE);
  }

  if (!mimetypesResolver.validate(RULES.TYPES, file.type)) {
    ctx.code = ERRORS.AVATAR.MIMETYPE.CODE;
    ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.AVATAR.MIMETYPE.MESSAGE);
  }

  return fn(ctx);
};
