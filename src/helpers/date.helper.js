module.exports = {
  addSeconds: (seconds = 0, date = new Date()) => date.setSeconds(date.getSeconds() + seconds),

  diffInSeconds: (d1, d2) => Math.round((d1.getTime() - d2.getTime()) / 1000),

  isBefore: (date, compared = new Date()) => (date < compared),

  isSet: (date) => date !== null && date !== undefined && date.constructor === Date,

  getUnixTime: (date = new Date()) => date.getTime() / 1000,
};
