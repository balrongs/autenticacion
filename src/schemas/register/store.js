const store = {
  first_name: {
    type: 'string',
    empty: false,
    min: 3,
    max: 80,
  },
  last_name: {
    type: 'string',
    empty: false,
    min: 3,
    max: 80,
  },
  email: {
    type: 'email',
    max: 150,
    unique: 'oauth_users:email',
  },
  password: {
    type: 'string',
    min: 6,
    max: 150,
  },
};

export default store;
