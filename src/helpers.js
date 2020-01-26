const debug = false;
const bold = require('kleur').bold();

const log = debug ? console.log.bind(console) : () => {};

// Prints an message & value
function logMsg(msg, value = {}) {
  log(`${bold.gray(msg)} - ${bold.blue(JSON.stringify(value, null, 2))}`);
}

function logConfig(config) {
  Object.entries(config).map(([key, value]) => {
    log(`${bold.blue(key.toUpperCase)}: ${bold.yellow(value)}`);
  });
}

// Prints a separator
function separator(title) {
  const bar = () => '='.repeat(10);
  log(bold.gray(`${bar}${bold.blue(title)}${bar()}`));
}

module.exports = {
  bold,
  logConfig,
  logMsg,
  log,
  separator
};
