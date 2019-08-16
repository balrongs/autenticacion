module.exports = {
  development: {
    username: 'postgres',
    password: 'docker',
    database: 'auth-db',
    host: '3.81.145.48.',
    port: 5432,
    dialect: 'postgres',
    seeds: 'dev',
    operatorsAliases: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    seeds: 'dev',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    seeds: 'prod',
  },
};
