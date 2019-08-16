import ERRORS from '../../config/constants/errors';
import CODES from '../../config/constants/codes';

const Models = require('../../models');

const { User, Password } = Models;

export default () => {
  const register = {};

  register.store = async ctx => {
    const req = ctx.request.body;

    const user = await User.create({
      first_name: req.first_name,
      last_name: req.last_name,
      email: req.email,
    }).catch(() => {
      ctx.code = ERRORS.REGISTER.REGISTER_ERROR.CODE;
      ctx.throw(CODES.HTTP.INTERNAL_ERROR, ERRORS.REGISTER.REGISTER_ERROR.MESSAGE);
    });

    return Password.create({ user_id: user.id, password: req.password })
      .then(async password => {
        const userUpdated = await user.update({ password_id: password.id });
        delete userUpdated.dataValues.email_token;

        return userUpdated;
      });
  };

  return register;
};
