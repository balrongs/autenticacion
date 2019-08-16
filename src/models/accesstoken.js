const TokenGenerator = require('uuid-token-generator');
const dateHelper = require('../helpers/date.helper');
const Oauth = require('../config/oauth');

const tokgen = new TokenGenerator(Oauth.TOKEN_ENCRYPTION, TokenGenerator.BASE62);

module.exports = (sequelize, DataTypes) => {
  const AccessToken = sequelize.define('AccessToken', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => tokgen.generate(),
    },
    client_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    scopes: DataTypes.TEXT,
    expires_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: () => dateHelper.addSeconds(Oauth.TOKEN_LIFETIME),
    },
    revoked_at: DataTypes.DATE,
  }, {
    tableName: 'oauth_access_tokens',
    underscored: true,

    scopes: {
      orderRandom: () => ({ order: sequelize.random() }),
    },

    getterMethods: {
      expires() {
        return dateHelper.diffInSeconds(this.expires_at, this.created_at);
      },
    },
  });

  AccessToken.associate = models => {
    AccessToken.belongsTo(models.Client, { foreignKey: 'client_id', onDelete: 'NO ACTION' });
  };

  return AccessToken;
};
