import TokenValidator from '../../validator/token.validator';

export default ({ tokenService }) => {
  const token = {};

  token.issue = async ctx => TokenValidator(ctx, tokenService.issue);

  return token;
};
