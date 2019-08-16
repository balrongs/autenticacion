import UserService from './users.service';
import UserHandler from './users.hadler';

export default () => {
  const userService = UserService();
  const userHandler = UserHandler({ userService });

  return {
    list: userHandler.list,
    show: userHandler.show,
    delete: userHandler.delete,
    restore: userHandler.restore,
  };
};
