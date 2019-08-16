const clientFactory = require('../../factories/client.factory');
const clientTest = require('../../seeds/dev/clients');
const constants = require('../../../src/config/seeder');
const Models = require('../../../src/models');

const { Client } = Models;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const clients = Array.from(Array(constants.CLIENTS_AMOUNT)).map(async () => {
      await clientFactory();
    });

    const testData = await clientTest.clients.map(async client => {
      await Client.create(client);
    });

    await Promise.all(clients, testData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('oauth_clients', null, {});
  },
};
