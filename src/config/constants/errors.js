const GENERAL = {
  BAD_REQUEST: {
    CODE: 'invalid_request',
    MESSAGE: 'the request could not be understood by the server due to malformed syntax.',
  },
  UNAUTHORIZED: {
    CODE: 'unauthorized',
    MESSAGE: 'you need a valid authorization to access this resource.',
  },
  FORBIDDEN: {
    CODE: 'forbidden',
    MESSAGE: 'you do not have permission to access this resource.',
  },
  NOT_FOUND: {
    CODE: 'not_found',
    MESSAGE: 'resource not found.',
  },
  RESOURCE_NOT_FOUND: {
    CODE: 'not_found',
    MESSAGE: '$(resource) not found.',
  },
  METHOD_NOT_ALLOWED: {
    CODE: 'method_not_allowed',
    MESSAGE: 'the method \'$(method)\' is not supported by this resource.',
  },
  NOT_ACCEPTABLE: {
    CODE: 'not_acceptable',
    MESSAGE: 'could not find acceptable representation.',
  },
  INTERNAL_ERROR: {
    CODE: 'internal_error',
    MESSAGE: 'ups, something went wrong. Please try later ...',
  },
  SERVICE_UNAVAILABLE: {
    code: 'service_unavailable',
    MESSAGE: 'the service is currently down for maintenance. Please try later ...',
  },
};

const VALIDATIONS = {
  UNKNOW_GRANT_TYPE: {
    CODE: 'invalid_request',
    MESSAGE: 'unknow grant type.',
  },
  UNSUPPORTED_GRANT_TYPE: {
    CODE: 'unsupported_grant_type',
    MESSAGE: 'grant type not supported.',
  },
};

const OAUTH = {
  INVALID_CLIENT: {
    CODE: 'invalid_client',
    MESSAGE: 'client authentication failed',
  },
  INVALID_TOKEN: {
    CODE: 'invalid_token',
    MESSAGE: 'the access token is expired, revoked, malformed, or invalid for other reasons.',
  },
  INVALID_REFRESH: {
    CODE: 'invalid_token',
    MESSAGE: 'the refresh token is expired, revoked, malformed, or invalid for other reasons.',
  },
  INVALID_CREDENTIALS: {
    CODE: 'invalid_crentials',
    MESSAGE: 'the user credentials were incorrect.',
  },
  OLD_CREDENTIALS: {
    CODE: 'invalid_crentials',
    MESSAGE: 'the user try login with old password.',
  },
  INVALID_AUTH_FORMAT: {
    CODE: 'invalid_authorization_format',
    MESSAGE: 'bad \'Authorization\' header format. Format is \'Authorization: Bearer <token>\'',
  },
  ACCOUNT_DELETED: {
    CODE: 'account_deleted',
    MESSAGE: 'this account has been deleted.',
  },
};

const REGISTER = {
  REGISTER_ERROR: {
    CODE: 'register_error',
    MESSAGE: 'ups, the user could not register. please try later.',
  },
};

const PASSWORD = {
  WRONG: {
    CODE: 'invalid_request',
    MESSAGE: 'old password is wrong!',
  },
};

const EMAIL = {
  VALIDATED: {
    CODE: 'email_validated',
    MESSAGE: 'the email has been validated.',
  },
  INVALID_TOKEN: {
    CODE: 'invalid_token',
    MESSAGE: 'the email confirmation token is invalid or not exists',
  },
};

const AVATAR = {
  FILE_REQUIRED: {
    CODE: 'invalid_request',
    MESSAGE: 'the avatar field is required and must be a file.',
  },
  FILE_SIZE: {
    CODE: 'max_file_size',
    MESSAGE: 'the file exceeds the max size allowed.',
  },
  MIMETYPE: {
    CODE: 'unsupport_mimetype',
    MESSAGE: 'the file format is not supported.',
  },
  FILE_EXCEPTION: {
    CODE: 'internal_error',
    MESSAGE: 'an error occurred while handling the file. Please try again later.',
  },
};

const USER = {
  INVALID_STATUS_DELETED: {
    CODE: 'invalid_status',
    MESSAGE: 'the user has already been deleted.',
  },
  INVALID_STATUS_ACTIVE: {
    CODE: 'invalid_status',
    MESSAGE: 'the user has already active.',
  },
};

export default {
  GENERAL,
  VALIDATIONS,
  OAUTH,
  REGISTER,
  PASSWORD,
  EMAIL,
  AVATAR,
  USER,
};
