const accessTokenFactory = require('../../factories/accesstoken.factory');
const refreshTokenFactory = require('../../factories/refreshtoken.factory');
const constants = require('../../../src/config/seeder');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tokens = Array.from(Array(constants.ACCESS_TOKENS_AMOUNT)).map(async () => {
      await accessTokenFactory().then(async (accessToken) => {
        await refreshTokenFactory({ access_token_id: accessToken.id });
      });
    });

    await Promise.all(tokens);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oauth_refresh_tokens').then(() => {
      queryInterface.bulkDelete('oauth_access_tokens', null, {});
    });
  },
};
