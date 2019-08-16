import Validator from '../../validator';
import Schema from '../../schemas/email';

const schema = Schema();

export default ({ emailService }) => {
  const email = {};

  email.confirm = async ctx => emailService.confirm(ctx);

  email.verify = async ctx => Validator(
    ctx,
    schema.verify,
    ctx.request.body,
    emailService.verify,
  );

  return email;
};
