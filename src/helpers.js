const debug = true;
const { bold } = require('kleur');

const log = debug ? console.log.bind(console) : () => {};

const logMessage = msg => bold().gray(msg);
const logValue = value => bold().yellow(value);
const logKey = key => bold().blue(key.toUpperCase());
const logObject = value => bold().blue(JSON.stringify(value, null, 2));

const logMsg = (msg, value = {}) =>
  log(`${logMessage(msg)} - ${logObject(value)}`);

function logConfig (config) {
  if (typeof config === 'object') {
    const entries = Object.entries(config);

    entries.map(([key, value]) => {
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
  logValue,
  separator
};
