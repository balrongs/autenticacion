module.exports = {
  isSet: (obj) => {
    return obj !== undefined
      && obj !== null
      && Object.entries(obj).length > 0;
  },
};
