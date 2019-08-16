const password = require('./issue/password');
const refresh = require('./issue/refresh');
const client = require('./issue/client');

export default () => {
  return {
    issue_password: password.issue,
    issue_refresh: refresh.issue,
    issue_client: client.issue,
  };
};
