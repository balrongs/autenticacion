import AccountService from './account.service';
import AccountHandler from './account.handler';

export default () => {
  const accountService = AccountService();
  const accountHandler = AccountHandler({ accountService });

  return {
    profile: accountHandler.profile,
    update: accountHandler.update,
    password: accountHandler.password,
    uploadAvatar: accountHandler.uploadAvatar,
    downloadAvatar: accountHandler.downloadAvatar,
  };
};
