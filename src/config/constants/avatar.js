const avatar = {
  MAX_AVATAR_SIZE: 25000000, // 25 MB
  TYPES: ['image/*'],
  URI: '/account/avatar',
  LOCAL_PATH: './storage',

  FILESYSTEMS: {
    LOCAL: 'local',
    S3: 's3',
  },

  KILOBYTE_SIZE: 1000,
};

export default avatar;
