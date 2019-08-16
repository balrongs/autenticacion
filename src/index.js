import Tokens from './services/token';
import Register from './services/register';
import Account from './services/account';
import UserRepository from './services/users';
import PasswordRepository from './services/passwords';
import Email from './services/email';
import exception from './middlewares/exception';
import auth from './middlewares/auth';
import scope from './middlewares/auth/scope';
import CONFIG from './config/app';
import SCOPE from './config/constants/scopes';
import RequestConfig from './config/koabody';

const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const json = require('koa-json');
const cors = require('@koa/cors');

const app = new Koa();
const router = new KoaRouter();

app.use(exception());
app.use(koaBody(RequestConfig));
app.use(json());
app.use(cors());

const tokens = Tokens();
const register = Register();
const account = Account();
const userRepository = UserRepository();
const passwordRepository = PasswordRepository();
const email = Email();

router.use([
  '/account/profile',
  '/account/password',
  '/users',
  '/email/confirm',
], auth());

router.post('/oauth/token', async ctx => {
  const response = await tokens.issue(ctx);
  ctx.body = response;
});

router.post('/register', async ctx => {
  ctx.body = await register.store(ctx);
});

router.get('/account/profile', async ctx => {
  ctx.body = await account.profile(ctx);
});

router.patch('/account/profile', async ctx => {
  ctx.body = await account.update(ctx);
});

router.post('/account/password', async ctx => {
  ctx.body = await account.password(ctx);
});

router.post('/account/avatar', auth(), async ctx => {
  ctx.body = await account.uploadAvatar(ctx);
});

router.get('/account/avatar/:token', async ctx => {
  ctx.body = await account.downloadAvatar(ctx);
});

router.get('/users', scope(SCOPE.READ), async ctx => {
  ctx.body = await userRepository.list(ctx);
});

router.get('/users/:userId', scope(SCOPE.READ), async ctx => {
  ctx.body = await userRepository.show(ctx);
});

router.delete('/users/:userId', scope(SCOPE.DELETE), async ctx => {
  ctx.body = await userRepository.delete(ctx);
});

router.post('/users/:userId/restore', scope(SCOPE.DELETE), async ctx => {
  ctx.body = await userRepository.restore(ctx);
});

router.post('/password/forgot', async ctx => {
  ctx.body = await passwordRepository.issueToken(ctx);
});

router.post('/password/reset', async ctx => {
  ctx.body = await passwordRepository.reset(ctx);
});

router.post('/email/confirm', async ctx => {
  ctx.body = await email.confirm(ctx);
});

router.post('/email/verify', async ctx => {
  ctx.body = await email.verify(ctx);
});

app.use(router.routes()).use(router.allowedMethods());

const server = app.listen(CONFIG.DEFAULT_PORT);
console.log(`Server running on port ${server.address().port} ...`);
