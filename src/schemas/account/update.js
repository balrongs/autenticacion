const update = {
  first_name: {
    type: 'string',
    optional: true,
    min: 3,
    max: 80,
  },
  last_name: {
    type: 'string',
    optional: true,
    min: 3,
    max: 80,
  },
  email: {
    type: 'email',
    optional: true,
    max: 150,
    unique: 'oauth_users:email',
  },
  password: { type: 'forbidden' },
};

export default update;
