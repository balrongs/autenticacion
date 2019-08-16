import MESSAGES from '../../config/constants/messages';

const strHelper = require('../../helpers/string.helper');

export default (param) => {
  const errorDescription = strHelper.isSet(param)
    ? MESSAGES.VALIDATIONS.PARAM.replace('$(param)', param)
    : null;

  return errorDescription;
};
