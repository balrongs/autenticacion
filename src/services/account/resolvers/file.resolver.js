import AVATAR_CONFIG from '../../../config/constants/avatar';
import LocalAdapter from './local.adapter';
import S3Adapter from './s3.adapter';

export default ctx => {
  const fileAdapter = {};
  const filesystem = process.env.AUTH_FILESYSTEM || null;
  let adapter;

  switch (filesystem) {
    case AVATAR_CONFIG.FILESYSTEMS.S3:
      adapter = S3Adapter(ctx);
      fileAdapter.upload = adapter.upload;
      fileAdapter.unlink = adapter.unlink;
      break;

    default:
      adapter = LocalAdapter(ctx);
      fileAdapter.upload = adapter.upload;
      fileAdapter.unlink = adapter.unlink;
      break;
  }

  return fileAdapter;
};
