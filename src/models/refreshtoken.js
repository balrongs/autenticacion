const TokenGenerator = require('uuid-token-generator');
const Oauth = require('../config/oauth');
const dateHelper = require('../helpers/date.helper');

const tokgen = new TokenGenerator(Oauth.TOKEN_ENCRYPTION, TokenGenerator.BASE62);

module.exports = (sequelize, DataTypes) => {
  const { Op } = sequelize;

  const RefreshToken = sequelize.define('RefreshToken', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => tokgen.generate(),
    },
    access_token_id: DataTypes.STRING,
    expires_at: {
      type: DataTypes.DATE,
      defaultValue: () => dateHelper.addSeconds(Oauth.REFRESH_LIFETIME),
    },
  }, {
    tableName: 'oauth_refresh_tokens',
    underscored: true,

    scopes: {
      valid: { where: { expires_at: { [Op.gt]: new Date() } } },
    },

    getterMethods: {
      isValid() {
        return dateHelper.isBefore(this.expires_at);
      },
    },
  });

  RefreshToken.associate = models => {
    RefreshToken.belongsTo(models.AccessToken, { foreignKey: 'access_token_id', onDelete: 'NO ACTION' });
  };

  return RefreshToken;
};
