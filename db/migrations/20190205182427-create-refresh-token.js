module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth_refresh_tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(100),
      },
      access_token_id: {
        type: Sequelize.STRING(100),
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('oauth_refresh_tokens');
  },
};
