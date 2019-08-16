import CODES from '../../config/constants/codes';
import MESSAGES from '../../config/constants/messages';
import Helpers from '../../helpers';
import FileResolver from './resolvers/file.resolver';
import AVATAR_CONFIG from '../../config/constants/avatar';
import UserResolver from './resolvers/user.resolver';

const fs = require('fs');

const { stringHelper } = Helpers();

export default () => {
  const account = {};

  account.profile = async ctx => UserResolver(ctx).get();

  account.update = async ctx => {
    const user = await UserResolver(ctx).get();
    const req = ctx.request.body;

    if (stringHelper.isSet(req.email) && req.email !== user.email) {
      user.email = req.email;
      user.email_verified_at = null;
    }

    user.first_name = req.first_name || user.first_name;
    user.last_name = req.last_name || user.last_name;

    user.save();

    return user;
  };

  account.password = async ctx => {
    const req = ctx.request.body;
    const user = await UserResolver(ctx).verify(req.old_password);
    const password = await UserResolver(ctx).createPassword(req.new_password);

    password.dataValues.last_upate = await UserResolver(ctx).lastPasswordUpate();
    delete password.dataValues.id;
    delete password.dataValues.password;

    return user.addPassword(password).then(() => password);
  };

  account.uploadAvatar = async ctx => {
    const fileResolver = FileResolver(ctx);
    const { avatar } = ctx.request.files;

    const user = await UserResolver(ctx).get();

    const oldAvatar = user.avatar.split('/').pop() || null;
    const fileName = avatar.path.split('/').pop().replace('upload_', '');
    const result = await fileResolver.upload(avatar, fileName);

    user.avatar = result.url;
    user.save();

    if (oldAvatar) fileResolver.unlink(oldAvatar);

    return {
      type: avatar.type,
      url: user.avatar,
      size: Math.ceil(avatar.size / AVATAR_CONFIG.KILOBYTE_SIZE),
    };
  };

  account.downloadAvatar = async (ctx) => {
    const { token } = ctx.params;
    const filePath = `${AVATAR_CONFIG.LOCAL_PATH}/${token}`;

    if (!fs.existsSync(filePath)) ctx.throw(CODES.HTTP.NOT_FOUND, MESSAGES.NOT_FOUND.FILE);

    return fs.createReadStream(filePath);
  };

  return account;
};
