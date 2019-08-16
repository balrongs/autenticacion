const userIdResolver = require('./resolvers/userid.resolver');

export default () => {
  const auth = async (ctx, next) => {
    const payload = await userIdResolver(ctx);
    ctx.userId = payload.sub;
    ctx.scope = payload.scope || null;
    await next();
  };

  return auth;
};
