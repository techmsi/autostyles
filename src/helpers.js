const debug = false;
const chalk = require('chalk');

const {
  bold: { gray, blue, yellow }
} = chalk;

const log = debug ? console.log.bind(console) : () => {};

// Prints an message & value
function logMsg(msg, value = {}) {
  log(`${gray(msg)} - ${blue(JSON.stringify(value, null, 2))}`);
}

function logConfig(config) {
  Object.entries(config).map(([key, value]) => {
    log(`${blue(key.toUpperCase())}: ${yellow(value)}`);
  });
}

// Prints a separator
function separator(title) {
  const bar = () => '='.repeat(10);
  log(chalk.gray(`${bar()}${blue(title)}${bar()}`));
}

module.exports = {
  logConfig,
  logMsg,
  log,
  separator
};
