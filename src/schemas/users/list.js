const list = {
  limit: {
    type: 'number',
    positive: true,
    integer: true,
    min: 1,
    max: 255,
    optional: true,
    convert: true,
  },
  page: {
    type: 'number',
    positive: true,
    integer: true,
    min: 1,
    max: 255,
    optional: true,
    convert: true,
  },
  order: {
    type: 'string',
    enum: ['alphabetic', 'latest'],
    optional: true,
  },
  trashed: {
    type: 'string',
    enum: ['true', 'false'],
    optional: true,
  },
};

export default list;
