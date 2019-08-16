import CODES from '../../../config/constants/codes';
import ERRORS from '../../../config/constants/errors';

const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

export default ctx => {
  const s3Adapter = {};

  const credentials = {
    accessKeyId: process.env.AUTH_S3_KEY,
    secretAccessKey: process.env.AUTH_S3_SECRET,
  };
  const s3 = new S3(credentials);

  s3Adapter.upload = async (file, token) => {
    const request = {
      Bucket: process.env.AUTH_S3_BUCKET,
      Key: token,
      Body: fs.createReadStream(file.path),
    };

    const response = await s3.upload(request)
      .promise()
      .then(result => {
        return { url: result.Location };
      }).catch(error => {
        ctx.code = error.code;
        ctx.throw(CODES.HTTP.INTERNAL_ERROR, ERRORS.AVATAR.FILE_EXCEPTION.MESSAGE);
      });

    return response;
  };

  s3Adapter.unlink = async token => {
    const request = {
      Bucket: process.env.AUTH_S3_BUCKET,
      Key: token,
    };

    s3.deleteObject(request)
      .promise()
      .catch(error => {
        // TODO: register error log with logger service
      });
  };

  return s3Adapter;
};
