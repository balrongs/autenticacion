const faker = require('faker/locale/es');
const models = require('../../src/models');
const constants = require('../../src/config/seeder');

const data = async (props = {}) => {
  const accessToken = await models.AccessToken.scope('orderRandom').findOne();

  const defaultProps = {
    id: faker.random.alphaNumeric(constants.ALPHA_NUMERIC_LENGTH),
    access_token_id: accessToken,
    expires_at: faker.date.future(),
  };

  return Object.assign({}, defaultProps, props);
};

const factory = async (props = {}) => {
  return models.RefreshToken.create(await data(props));
};

module.exports = factory;
