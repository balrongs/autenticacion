module.exports = {
  isSet: (str) => {
    return str !== undefined && str !== null && str.length !== 0 && str.constructor === String;
  },
};
