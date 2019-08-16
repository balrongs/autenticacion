const stringHelper = require('./string.helper');
const dateHelper = require('./date.helper');
const objectHelper = require('./object.helper');

module.exports = () => {
  const Helpers = {};

  Helpers.stringHelper = stringHelper;

  Helpers.dateHelper = dateHelper;

  Helpers.objectHelper = objectHelper;

  return Helpers;
};
