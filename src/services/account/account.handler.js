import Validator from '../../validator';
import FileValidator from '../../validator/file.validator';
import Schema from '../../schemas/account';

const schema = Schema();

export default ({ accountService }) => {
  const account = {};

  account.profile = async ctx => accountService.profile(ctx);

  account.update = async ctx => Validator(
    ctx,
    schema.update,
    ctx.request.body,
    accountService.update,
  );

  account.password = async ctx => Validator(
    ctx,
    schema.password,
    ctx.request.body,
    accountService.password,
  );

  account.uploadAvatar = async ctx => FileValidator(
    ctx,
    ctx.request.files ? ctx.request.files.avatar : null,
    accountService.uploadAvatar,
  );

  account.downloadAvatar = async ctx => accountService.downloadAvatar(ctx);

  return account;
};
