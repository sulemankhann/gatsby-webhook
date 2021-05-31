function info(msg) {
  return console.debug(format(msg, 'info'));
}

function error(msg) {
  return console.error(format(msg, 'error'));
}

function debug(msg) {
  if (process.env.NODE_ENV === 'development') return;
  return console.debug(format(msg, 'debug'));
}

function format(msg, type) {
  // from https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
  const time = new Date()
    .toISOString()
    .replace(/T/, ' ') // replace T with a space
    .replace(/\..+/, ''); // delete the dot and everything after

  // try to convert objects to string
  if (typeof msg === 'object') {
    try {
      msg = '\n' + JSON.stringify(msg, null, 4);
    } catch (err) {
      msg = '[Object]';
    }
  }

  return `${time} [${type}] ${msg}`;
}

module.exports = {
  info,
  debug,
  error,
};
