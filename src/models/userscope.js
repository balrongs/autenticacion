module.exports = (sequelize, DataTypes) => {
  const UserScope = sequelize.define('UserScope', {
    user_id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
    scope_id: {
      primaryKey: true,
      type: DataTypes.UUID,
    },
  }, {
    tableName: 'oauth_user_scope',
    timestamps: false,
  });
  return UserScope;
};
