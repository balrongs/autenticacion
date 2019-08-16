import CONFIG from '../../config/app';
import CODES from '../../config/constants/codes';

export default (action) => {
  const scope = async (ctx, next) => {
    if (!ctx.scope) ctx.throw(CODES.HTTP.FORBIDDEN, '');

    const scopes = ctx.scope.split(' ');
    const userScope = scopes.filter(part => part.includes(CONFIG.SCOPE_PREFIX));
    const parts = userScope.shift().split(':');

    if (!parts.shift() === CONFIG.SCOPE_PREFIX || !parts.shift().includes(action)) {
      ctx.throw(CODES.HTTP.FORBIDDEN, '');
    }

    await next();
  };

  return scope;
};
