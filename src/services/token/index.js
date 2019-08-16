import TokenService from './token.service';
import TokenHandler from './token.handler';

export default () => {
  const tokenService = TokenService();
  const tokenHandler = TokenHandler({ tokenService });

  return {
    issue: tokenHandler.issue,
    show: tokenHandler.show,
  };
};
