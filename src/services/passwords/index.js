import PasswordService from './passwords.service';
import PasswordHandler from './passwords.handler';

export default () => {
  const passwordService = PasswordService();
  const passwordHandler = PasswordHandler({ passwordService });

  return {
    issueToken: passwordHandler.issueToken,
    reset: passwordHandler.reset,
  };
};
