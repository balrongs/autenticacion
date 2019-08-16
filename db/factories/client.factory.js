const faker = require('faker/locale/es');
const models = require('../../src/models');

const data = async (props = {}) => {
  const defaultProps = {
    name: faker.commerce.productName(),
    secret: faker.internet.password(),
    revoked_at: null,
  };

  return Object.assign({}, defaultProps, props);
};

const factory = async (props = {}) => {
  return models.Client.create(await data(props));
};

module.exports = factory;
