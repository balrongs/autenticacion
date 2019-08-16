const dateHelper = require('../helpers/date.helper');
const stringHelper = require('../helpers/string.helper');

module.exports = (sequelize, DataTypes) => {
  const OauthUser = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password_id: DataTypes.UUID,
    email: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    email_token: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('avatar');
        return stringHelper.isSet(value) ? value : '';
      },
    },
    phone: {
      type: DataTypes.STRING,
      get() {
        const value = this.getDataValue('phone');
        return stringHelper.isSet(value) ? value : '';
      },
    },
  }, {
    tableName: 'oauth_users',
    underscored: true,
    paranoid: true,

    defaultScope: {
      attributes: { exclude: ['password_id', 'email_token'] },
    },

    scopes: {
      orderRandom: () => {
        return { order: [[sequelize.literal('random()')]] };
      },
      alphabetic: () => {
        return {
          order: [
            ['last_name', 'ASC'],
            ['first_name', 'ASC'],
          ],
        };
      },
      latest: () => {
        return { order: [['created_at', 'DESC']] };
      },
      trashed: {
        paranoid: false,
        where: { deleted_at: { [sequelize.Op.ne]: null } },
      },
    },

    getterMethods: {
      email_validated() {
        const verifiedAt = this.email_verified_at;
        delete this.dataValues.email_verified_at;
        return dateHelper.isSet(verifiedAt);
      },
      status() {
        const deletedAt = this.deleted_at;
        delete this.dataValues.deleted_at;
        delete this.dataValues.password_id;
        return dateHelper.isSet(deletedAt) ? 'deleted' : 'active';
      },
    },

    hooks: {
      beforeCreate: async (user) => {
        user.email = user.email.toLowerCase();
      },
    },
  });

  OauthUser.associate = models => {
    OauthUser.hasMany(models.Password, {
      foreignKey: 'user_id',
      onDelete: 'NO ACTION',
    });
    OauthUser.belongsToMany(models.Scope, {
      through: models.UserScope,
    });
  };

  return OauthUser;
};
