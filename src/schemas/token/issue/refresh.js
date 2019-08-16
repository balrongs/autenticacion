const issue = {
  grant_type: {
    type: 'string',
    enum: ['refresh_token'],
    empty: false,
  },
  refresh: { type: 'string', min: 10, max: 150 },
  client_id: { type: 'string', empty: false },
  client_secret: { type: 'string', min: 10, max: 150 },
};

exports.issue = issue;
