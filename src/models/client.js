module.exports = (sequelize, DataTypes) => {
  const OauthClient = sequelize.define('Client', {
    name: DataTypes.STRING,
    secret: DataTypes.STRING,
    revoked_at: DataTypes.DATE,
  }, {
    tableName: 'oauth_clients',
    underscored: true,

    scopes: {
      orderRandom: () => ({ order: sequelize.random() }),
    },
  });
  return OauthClient;
};
