import CODES from '../../../config/constants/codes';
import ERRORS from '../../../config/constants/errors';

const bcrypt = require('bcrypt');
const Models = require('../../../models');

const { User, Password } = Models;

export default ctx => {
  const userResolver = {};

  userResolver.get = () => User
    .findOne({ where: { id: ctx.userId }, paranoid: false })
    .then(user => {
      if (!user) {
        ctx.throw(
          CODES.HTTP.NOT_FOUND,
          ERRORS.GENERAL.RESOURCE_NOT_FOUND.MESSAGE.replace('$(resource)', User.name),
        );
      }
      if (user.deleted_at) {
        ctx.code = ERRORS.OAUTH.ACCOUNT_DELETED.CODE;
        ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.ACCOUNT_DELETED.MESSAGE);
      }
      return user;
    });

  userResolver.verify = (password) => User
    .findOne({
      include: [{ model: Password, required: true }],
      where: { id: ctx.userId },
      order: [[Password, 'created_at', 'desc']],
      paranoid: false,
    })
    .then(async userResponse => {
      if (userResponse) {
        if (!await bcrypt.compare(password, userResponse.Passwords.shift().password)) {
          ctx.code = ERRORS.PASSWORD.WRONG.CODE;
          ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.PASSWORD.WRONG.MESSAGE);
        }

        if (userResponse.deleted_at) {
          ctx.code = ERRORS.OAUTH.ACCOUNT_DELETED.CODE;
          ctx.throw(CODES.HTTP.FORBIDDEN, ERRORS.OAUTH.ACCOUNT_DELETED.MESSAGE);
        }
        return userResponse;
      }
    });

  userResolver.createPassword = (password) => Password.create({
    user_id: ctx.userId,
    password,
  });

  userResolver.lastPasswordUpate = () => Password.scope('latest')
    .findOne({ where: { user_id: ctx.userId }, attributes: ['created_at'] })
    .then(pass => pass.created_at);

  return userResolver;
};
