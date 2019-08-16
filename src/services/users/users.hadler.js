import Validator from '../../validator';
import Schema from '../../schemas/users';

const schema = Schema();

export default ({ userService }) => {
  const userRepository = {};

  userRepository.list = async ctx => {
    ctx.trashed = ctx.query.trashed === 'true';

    return Validator(
      ctx,
      schema.list,
      ctx.query,
      userService.list,
    );
  };

  userRepository.show = async ctx => Validator(
    ctx,
    schema.show,
    ctx.params,
    userService.show,
  );

  userRepository.delete = async ctx => userService.delete(ctx);

  userRepository.restore = async ctx => userService.restore(ctx);

  return userRepository;
};
