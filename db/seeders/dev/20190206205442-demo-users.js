const userFactory = require('../../factories/user.factory');
const userTest = require('../../seeds/dev/users');
const passwordTest = require('../../seeds/dev/passwords');
const scopesTest = require('../../seeds/dev/scopes');
const constants = require('../../../src/config/seeder');
const Models = require('../../../src/models');

const {
  User,
  Password,
  Scope,
  UserScope,
} = Models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = Array.from(Array(constants.USERS_AMOUNT)).map(async () => {
      await userFactory();
    });

    const scopePromise = await scopesTest.scopes.map(async scopeData => {
      await Scope.create(scopeData);
    });

    const testData = await userTest.users.map(async user => {
      const u = await User.create(user);
      const password = passwordTest.passwords.filter(p => p.user_id === u.id).shift();
      if (password) {
        Password.create(password).then(p => u.update({ password_id: p.id }));
      }
    });

    const userscopePromise = await scopesTest.userScopes.map(async data => {
      await UserScope.create(data);
    });

    await Promise.all(users, testData, scopePromise, userscopePromise);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oauth_users', null, {});
  },
};
