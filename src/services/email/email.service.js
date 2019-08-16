import CODES from '../../config/constants/codes';
import ERRORS from '../../config/constants/errors';
import UserResolver from '../account/resolvers/user.resolver';
import EMAIL from '../../config/email';
import TemplateResolver from './resolvers/template.resolver';

const UIDGenerator = require('uid-generator');
const nodemailer = require('nodemailer');
const Models = require('../../models');

const uidgen = new UIDGenerator();
const { User } = Models;

export default () => {
  const email = {};

  email.confirm = async ctx => {
    const user = await UserResolver(ctx).get();

    if (user.email_validated) {
      ctx.code = ERRORS.EMAIL.VALIDATED.CODE;
      ctx.throw(CODES.HTTP.FORBIDDEN, ERRORS.EMAIL.VALIDATED.MESSAGE);
    }

    const transporter = nodemailer.createTransport(EMAIL.CONNECTION);
    const templateResolver = TemplateResolver();

    return user.update({
      email_token: await uidgen.generate(),
    }).then(async userResponse => {
      const config = { from: EMAIL.FROM, to: user.email, subject: user.CONFIRM_SUBJECT };
      const mailInfo = templateResolver.info(config, user.email_token, EMAIL.CONFIRM_CALLBACK);
      await transporter.sendMail(mailInfo);

      return {
        user_id: userResponse.id,
        sent_to: userResponse.email,
        sent_at: new Date(),
      };
    });
  };

  email.verify = async ctx => {
    const { token } = ctx.request.body;
    return User
      .findOne({ where: { email_token: token }, paranoid: false })
      .then(user => {
        if (!user) {
          ctx.code = ERRORS.EMAIL.INVALID_TOKEN.CODE;
          ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.EMAIL.INVALID_TOKEN.MESSAGE);
        }
        if (user.deleted_at) {
          ctx.code = ERRORS.OAUTH.ACCOUNT_DELETED.CODE;
          ctx.throw(CODES.HTTP.UNAUTHORIZED, ERRORS.OAUTH.ACCOUNT_DELETED.MESSAGE);
        }
        return user.update({ email_verified_at: new Date(), email_token: null })
          .then(userUpdated => {
            delete userUpdated.dataValues.email_token;
            return userUpdated;
          });
      });
  };

  return email;
};
