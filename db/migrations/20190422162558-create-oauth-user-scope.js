module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('oauth_user_scope', {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      scope_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('oauth_user_scope');
  },
};
