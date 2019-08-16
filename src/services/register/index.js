import RegisterService from './register.service';
import RegisterHandler from './register.handler';

export default () => {
  const registerService = RegisterService();
  const registerHandler = RegisterHandler({ registerService });

  return {
    store: registerHandler.store,
  };
};
