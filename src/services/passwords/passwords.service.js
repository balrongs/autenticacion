import CODES from '../../config/constants/codes';
import ERRORS from '../../config/constants/errors';
import MESSAGES from '../../config/constants/messages';
import EMAIL from '../../config/email';
import TemplateResolver from './resolvers/template.resolver';

const nodemailer = require('nodemailer');
const Models = require('../../models');

const { User, Password, PasswordReset } = Models;

export default () => {
  const passwordRepository = {};

  passwordRepository.issueToken = async ctx => {
    const { email } = ctx.request.body;

    const user = await User
      .findOne({ where: { email }, attributes: ['id', 'email'], paranoid: false })
      .then(userResult => {
        if (!userResult) {
          ctx.throw(
            CODES.HTTP.NOT_FOUND,
            ERRORS.GENERAL.RESOURCE_NOT_FOUND.MESSAGE.replace('$(resource)', User.name),
          );
        }
        if (userResult.deleted_at) {
          ctx.code = ERRORS.OAUTH.ACCOUNT_DELETED.CODE;
          ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.ACCOUNT_DELETED.MESSAGE);
        }
        return userResult;
      });

    const transporter = nodemailer.createTransport(EMAIL.CONNECTION);
    const templateResolver = TemplateResolver();

    return PasswordReset.create({ user_id: user.id }).then(async passwordReset => {
      const config = { from: EMAIL.FROM, to: user.email, subject: EMAIL.RESET_SUBJECT };
      const mailInfo = templateResolver.info(config, passwordReset.id, EMAIL.RESET_CALLBACK);
      await transporter.sendMail(mailInfo);

      delete passwordReset.dataValues.id;
      return passwordReset;
    });
  };

  passwordRepository.reset = async ctx => {
    const req = ctx.request.body;
    const reset = await PasswordReset.findOne({ where: { id: req.token } })
      .then(resetResult => {
        if (!resetResult) {
          ctx.throw(CODES.HTTP.NOT_FOUND, MESSAGES.NOT_FOUND.PASSWORD_RESET);
        }
        if (resetResult.expires_at < new Date()) {
          ctx.throw(CODES.HTTP.FORBIDDEN, MESSAGES.FORBIDDEN.PASSWORD_RESET);
        }
        return resetResult;
      });

    const userId = reset.user_id;
    const lastUpate = await Password.scope('latest')
      .findOne({ where: { user_id: userId }, attributes: ['created_at'] })
      .then(pass => pass.created_at);
    await reset.destroy();

    return Password.create({ user_id: userId, password: req.password })
      .then(password => {
        delete password.dataValues.id;
        delete password.dataValues.password;
        password.dataValues.last_update = lastUpate;
        return password;
      });
  };

  return passwordRepository;
};
