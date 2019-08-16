import CODES from '../../config/constants/codes';
import MESSAGES from '../../config/constants/messages';
import HEADERS from '../../config/constants/headers';
import error from './error';

export default () => {
  const exception = {};

  exception.handler = async (ctx, next) => {
    try {
      ctx.assert(ctx.request.accepts('application/json'), CODES.HTTP.NOT_ACCEPTABLE, '');

      const contentLength = ctx.request.headers[HEADERS.CONTENT_LENGTH.KEY];
      if (contentLength !== undefined) {
        ctx.assert(
          contentLength < HEADERS.CONTENT_LENGTH.MAX_SIZE,
          CODES.HTTP.BAD_REQUEST,
          MESSAGES.BAD_REQUEST.SIZE,
        );
      }

      await next();

      if (ctx.status === CODES.HTTP.BAD_REQUEST) ctx.throw(CODES.HTTP.BAD_REQUEST, '');

      if (ctx.status === CODES.HTTP.NOT_FOUND) ctx.throw(CODES.HTTP.NOT_FOUND, '');

      if (ctx.status === CODES.HTTP.METHOD_NOT_ALLOWED) ctx.throw(CODES.HTTP.METHOD_NOT_ALLOWED, '');
    } catch (err) {
      ctx.response.status = err.status || CODES.HTTP.INTERNAL_ERROR;
      ctx.body = error(ctx, err.message, ctx.code);
    }
  };

  return exception.handler;
};
