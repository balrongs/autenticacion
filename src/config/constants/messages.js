const BAD_REQUEST = {
  SIZE: 'the request exceeds the maximum size allowed.',
};

const NOT_FOUND = {
  FILE: 'file not found.',
  PASSWORD_RESET: 'the password reset token does not exists.',
};

const FORBIDDEN = {
  PASSWORD_RESET: 'the password reset token has expired.',
};

const VALIDATIONS = {
  PARAM: 'request was missing the \'$(param)\' parameter.',
  UNIQUE: 'the \'$(param)\' already exists!',
  UUID: 'the request must be a valid UUID v4.',
};

export default {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  VALIDATIONS,
};
