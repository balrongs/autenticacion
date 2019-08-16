const TokenGenerator = require('uuid-token-generator');
const dateHelper = require('../helpers/date.helper');
const Oauth = require('../config/oauth');

const tokgen = new TokenGenerator(Oauth.TOKEN_ENCRYPTION, TokenGenerator.BASE62);

module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => tokgen.generate(),
    },
    user_id: DataTypes.UUID,
    created_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: () => new Date(),
    },
    expires_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: () => dateHelper.addSeconds(Oauth.RESET_PASSWORD_LIFETIME),
    },
  }, {
    tableName: 'oauth_password_resets',
    underscored: true,
    timestamps: false,

    hooks: {
      beforeCreate: async (model) => {
        model.created_at = new Date();
      },
    },
  });
  PasswordReset.associate = models => {
    PasswordReset.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
  };
  return PasswordReset;
};
