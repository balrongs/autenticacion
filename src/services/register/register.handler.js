import Validator from '../../validator';
import Schema from '../../schemas/register';

const schema = Schema();
export default ({ registerService }) => {
  const register = {};

  register.store = async ctx => Validator(
    ctx,
    schema.store,
    ctx.request.body,
    registerService.store,
  );

  return register;
};
