const password = {
  old_password: {
    type: 'string',
    min: 6,
    max: 150,
  },
  new_password: {
    type: 'string',
    min: 6,
    max: 150,
  },
};

export default password;
