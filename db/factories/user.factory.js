const faker = require('faker/locale/es');
const models = require('../../src/models');

const data = async (props = {}) => {
  const defaultProps = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    email_verified_at: Math.floor(Math.random() * 10) > 2 ? faker.date.past() : null,
    avatar: faker.internet.avatar(),
    phone: faker.phone.phoneNumber(),
    deleted_at: Math.floor(Math.random() * 10) < 2 ? faker.date.past() : null,
  };

  return Object.assign({}, defaultProps, props);
};

const factory = async (props = {}) => {
  const user = await models.User.create(await data(props));
  const userPassword = models.Password.create({ user_id: user.id, password: 'secret' })
    .then(p => user.update({ password_id: p.id }));
  return userPassword;
};

module.exports = factory;
