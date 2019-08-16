const issue = {
  grant_type: {
    type: 'string',
    enum: ['password'],
    empty: false,
  },
  username: { type: 'email', max: 150 },
  password: { type: 'string', min: 6, max: 150 },
  client_id: { type: 'string', empty: false },
  client_secret: { type: 'string', min: 10, max: 150 },
};

exports.issue = issue;
