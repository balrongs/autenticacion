const issue = {
  grant_type: {
    type: 'string',
    enum: ['client_credentials'],
    empty: false,
  },
  client_id: { type: 'string' },
  client_secret: { type: 'string', min: 10, max: 150 },
};

exports.issue = issue;
