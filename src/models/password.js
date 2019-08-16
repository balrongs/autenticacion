const bcrypt = require('bcrypt');
const CONFIG = require('../config/app');

module.exports = (sequelize, DataTypes) => {
  const Password = sequelize.define('Password', {
    user_id: DataTypes.UUID,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
  }, {
    tableName: 'oauth_passwords',
    underscored: true,
    timestamps: false,

    scopes: {
      latest: () => {
        return { order: [['created_at', 'DESC']] };
      },
    },

    hooks: {
      beforeCreate: async (model) => {
        const hash = await bcrypt.hash(model.password, CONFIG.ENCRYPTION.SALT);
        model.password = hash;
        model.created_at = new Date();
      },
    },
  });
  Password.associate = models => {
    Password.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'NO ACTION' });
  };
  return Password;
};
