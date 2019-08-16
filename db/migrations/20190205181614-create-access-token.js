module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth_access_tokens', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(100),
      },
      client_id: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.UUID,
      },
      scopes: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      expires_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      revoked_at: {
        allowNull: true,
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
    return queryInterface.dropTable('oauth_access_tokens');
  },
};
