# Auth server
Oauth 2 service. Develop on [Koajs](https://koajs.com/) framework for node.js

## Getting started
Read endpoint definition in `api.html` on `docs` directory after run
```
$ npm run docs
```

## Requerimients
* Node v7.6.0 or higher.
* Docker

## Installation
On project directory excecute
```
$ npm install
```

### Database connection
This project use [Sequelize](http://docs.sequelizejs.com/). The config file is located in `src/config/database.js`.

### Migrations
Migrations directory is located in `db/migrations`. Run migration with:

```
$ npm run sequelize db:migrate
```
> undo migrations with `$ npm run sequelize db:migrate:undo:all`

### Seeders
Seeders directory is located in `db/seeders`. Every environment has it's own directory. The seeder config file is located in `src/config/seeder.js`. Run seeders with:
```
$ npm run sequelize db:seed:all
```
> undo seeders with `$ npm run sequelize db:seed:undo:all`

## Test
List of test users:
* test.user.01@jumpitt.com
* test.user.02@jumpitt.com
* test.user.03@jumpitt.com
* test.user.04@jumpitt.com
* test.user.05@jumpitt.com

All users created by table seeder have the same password: `secret`.

Tests clients:
```
{
  "client_id": "1231c2f5-5e26-4f42-a70f-90dbc781113e",
  "client_secret": "jd_HblXXzKd4cZo"
}
```

```
{
  "client_id": "35e3cd57-186e-4d21-8ae5-4d8d9e7f8465",
  "client_secret": "E4oU2Q7Fep2mr93"
}
```
  
### Environment variables
* `NODE_ENV`: Environment. Values `development`, `test` or `production`
* `AUTH_APP_DOMAIN` : The App domain. Default `http://localhost`
* `AUTH_FILESYSTEM` : Must be `local` or `s3`

If select `s3` configuration you must add the following variables:
* `AUTH_S3_KEY` : The access key id.
* `AUTH_S3_SECRET` : The secret access key.
* `AUTH_S3_BUCKET` : The bucket name.

Email configuration
* `AUTH_EMAIL_HOST`:  is the hostname or IP address to connect to. Defaults to localhost.
* `AUTH_EMAIL_PORT`: is the port to connect to. Defaults to 587
* `AUTH_EMAIL_USER`: email credentials.
* `AUTH_EMAIL_PASSWORD`: email credentials.
* `AUTH_CONFIRM_CALLBACK`: url to bind the confirmaction link.

> Load environment variables with `export {ENV_VAR_NAME}={VALUE}`

## Running server
```
$ npm run docker
```
```
$ npm run dev
```
