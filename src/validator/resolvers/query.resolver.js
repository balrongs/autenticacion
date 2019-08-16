export default () => {
  const query = {};

  query.first = (table, attr, val, fields = '*') => {
    return `SELECT ${fields} FROM ${table} WHERE LOWER(${attr}) = LOWER('${val}') LIMIT 1`;
  };

  return query;
};
