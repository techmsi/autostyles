const debug = false;
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const { bold: { gray, blue } } = chalk;

const log = debug ? console.log.bind(console) : () => {};

// Prints an message & value
function logMsg (msg, value) {
  log(`${gray(msg)} - ${blue(JSON.stringify(value, null, 2))}`);
}

// Prints a separator
function separator (title) {
  const bar = () => '='.repeat(10);
  log(chalk.gray(`${bar()}${blue(title)}${bar()}`));
}

function removeTempTemplates () {
  fs.removeSync(path.join(process.cwd(), '_templates'));
}

module.exports = {
  logMsg,
  log,
  separator,
  removeTempTemplates
};
