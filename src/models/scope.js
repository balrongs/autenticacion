module.exports = (sequelize, DataTypes) => {
  const Scope = sequelize.define('Scope', {
    name: DataTypes.STRING,
  }, {
    tableName: 'oauth_scopes',
    underscored: true,
  });
  Scope.associate = models => {
    Scope.belongsToMany(models.User, {
      through: models.UserScope,
    });
  };
  return Scope;
};
