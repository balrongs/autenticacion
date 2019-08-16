import CODES from '../../../config/constants/codes';
import ERRORS from '../../../config/constants/errors';
import AVATAR from '../../../config/constants/avatar';
import APP_CONFIG from '../../../config/app';

const fs = require('fs');

export default ctx => {
  const localAdapter = {};

  localAdapter.upload = async (file, token) => {
    const baseUrl = `${APP_CONFIG.APP_DOMAIN}:${APP_CONFIG.DEFAULT_PORT}${AVATAR.URI}`;
    await fs.rename(file.path, `${AVATAR.LOCAL_PATH}/${token}`, err => {
      if (err) {
        ctx.throw(CODES.HTTP.INTERNAL_ERROR, ERRORS.AVATAR.FILE_EXCEPTION.MESSAGE);
      }
    });

    return { url: `${baseUrl}/${token}` };
  };

  localAdapter.unlink = async token => {
    fs.unlink(`${AVATAR.LOCAL_PATH}/${token}`, err => {
      if (err) {
        // TODO: register error log with logger service
      }
    });
  };

  return localAdapter;
};
