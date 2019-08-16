import COLLECTION from '../../config/constants/collection';
import CODES from '../../config/constants/codes';
import ERRORS from '../../config/constants/errors';

const Models = require('../../models');

const { User } = Models;

export default () => {
  const userRepository = {};

  userRepository.list = async ctx => {
    const limit = ctx.query.limit || COLLECTION.PAGINATION.LIMIT;
    const page = ctx.query.page || COLLECTION.PAGINATION.INITIAL_PAGE;
    const offset = limit * (page - 1);
    const order = ctx.query.order || COLLECTION.ORDER.DEFAULT;
    const scopes = [order, 'defaultScope'];

    if (ctx.trashed) scopes.unshift('trashed');

    return User.scope(scopes)
      .findAndCountAll({ offset, limit })
      .then(result => ({
        total: result.count,
        page: parseInt(page, COLLECTION.PAGINATION.RADIX),
        per_page: parseInt(limit, COLLECTION.PAGINATION.RADIX),
        data: result.rows,
      }));
  };

  userRepository.show = async ctx => User
    .findOne({ where: { id: ctx.params.userId }, paranoid: false })
    .then(user => {
      if (!user) {
        ctx.throw(
          CODES.HTTP.NOT_FOUND,
          ERRORS.GENERAL.RESOURCE_NOT_FOUND.MESSAGE.replace('$(resource)', User.name),
        );
      }
      return user;
    });

  userRepository.delete = async ctx => User
    .findOne({ where: { id: ctx.params.userId }, paranoid: false })
    .then(user => {
      if (!user) {
        ctx.throw(
          CODES.HTTP.NOT_FOUND,
          ERRORS.GENERAL.RESOURCE_NOT_FOUND.MESSAGE.replace('$(resource)', User.name),
        );
      }
      if (user.deleted_at) {
        ctx.code = ERRORS.USER.INVALID_STATUS_DELETED.CODE;
        ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.USER.INVALID_STATUS_DELETED.MESSAGE);
      }
      return user.destroy();
    });

  userRepository.restore = async ctx => User
    .findOne({ where: { id: ctx.params.userId }, paranoid: false })
    .then(user => {
      if (!user) {
        ctx.throw(
          CODES.HTTP.NOT_FOUND,
          ERRORS.GENERAL.RESOURCE_NOT_FOUND.MESSAGE.replace('$(resource)', User.name),
        );
      }
      if (!user.deleted_at) {
        ctx.code = ERRORS.USER.INVALID_STATUS_ACTIVE.CODE;
        ctx.throw(CODES.HTTP.BAD_REQUEST, ERRORS.USER.INVALID_STATUS_ACTIVE.MESSAGE);
      }
      return user.restore();
    });

  return userRepository;
};
