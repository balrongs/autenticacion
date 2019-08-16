import CODES from '../../config/constants/codes';
import MESSAGES from '../../config/constants/messages';
import SequelizeResolver from './sequelize.resolver';
import QueryResolver from './query.resolver';

const strHelper = require('../../helpers/string.helper');

const sequelize = SequelizeResolver();
const queryResolver = QueryResolver();

export default async (ctx, schema, params) => {
  const checks = Object.keys(schema)
    .filter(key => strHelper.isSet(schema[key].unique))
    .map(key => {
      const values = schema[key].unique.split(':');
      const table = values.shift();
      const attr = values.shift();
      return { key, val: { table, attr } };
    });

  const results = checks.map(async el => {
    const resp = await sequelize.query(
      queryResolver.first(el.val.table, el.val.attr, params[el.key], '*'),
      { type: sequelize.QueryTypes.SELECT },
    );
    return Object.assign(el, { duplicated: resp.length > 0 });
  });

  const duplicated = await Promise.all(results);

  if (duplicated.filter(el => el.duplicated).length > 0) {
    ctx.throw(
      CODES.HTTP.BAD_REQUEST,
      MESSAGES.VALIDATIONS.UNIQUE.replace('$(param)', duplicated.shift().key),
    );
  }

  return true;
};
