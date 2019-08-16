module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth_users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(80),
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING(80),
      },
      password_id: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      email: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING(150),
      },
      email_verified_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      email_token: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(15),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('oauth_users');
  },
};
