const debug = true;
const { grey, green, blue, yellow } = require('tiny-chalk');

const log = debug ? console.log.bind(console) : () => {};

const logMessage = (msg) => grey(msg);
const logPrompt = (value) => green(value);
const logValue = (value) => yellow(value);
const logKey = (key) => blue(key.toUpperCase());
const logObject = (value) => blue(JSON.stringify(value, null, 2));

const logMsg = (msg, value = {}) =>
  log(`${logMessage(msg)} - ${logObject(value)}`);

function logConfig (config) {
  if (typeof config === 'object') {
    const entries = Object.entries(config);

    entries.forEach(([key, value]) => {
      log(`${logKey(key)}: ${logValue(value)}`);
    });
  }
}

function separator (title) {
  const bar = () => '='.repeat(10);

  log([bar(), logValue(title), bar()].join(''));
}

module.exports = {
  logConfig,
  logMsg,
  logPrompt,
  logMessage,
  logValue,
  separator
};
