module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth_password_resets', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(100),
      },
      user_id: {
        type: Sequelize.UUID,
      },
      created_at: {
        type: Sequelize.DATE,
      },
      expires_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('oauth_password_resets');
  },
};
