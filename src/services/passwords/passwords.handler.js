import Validator from '../../validator';
import Schema from '../../schemas/password';

const schema = Schema();

export default ({ passwordService }) => {
  const passwordRepository = {};

  passwordRepository.issueToken = async ctx => Validator(
    ctx,
    schema.issueToken,
    ctx.request.body,
    passwordService.issueToken,
  );

  passwordRepository.reset = async ctx => Validator(
    ctx,
    schema.reset,
    ctx.request.body,
    passwordService.reset,
  );

  return passwordRepository;
};
