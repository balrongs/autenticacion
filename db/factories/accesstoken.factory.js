const faker = require('faker/locale/es');
const models = require('../../src/models');
const constants = require('../../src/config/seeder');

const data = async (props = {}) => {
  const client = await models.Client.scope('orderRandom').findOne();
  const user = await models.User.scope('orderRandom').findOne();

  const defaultProps = {
    id: faker.random.alphaNumeric(constants.ALPHA_NUMERIC_LENGTH),
    client_id: client.id,
    user_id: user.id,
    expires_at: faker.date.future(),
    revoked_at: null,
  };

  return Object.assign({}, defaultProps, props);
};

const factory = async (props = {}) => {
  return models.AccessToken.create(await data(props));
};

module.exports = factory;
