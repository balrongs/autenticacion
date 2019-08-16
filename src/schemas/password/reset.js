const reset = {
  token: {
    type: 'string',
    max: 150,
    empty: false,
  },
  password: {
    type: 'string',
    min: 6,
    max: 150,
  },
};

export default reset;
