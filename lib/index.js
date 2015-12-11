#! /usr/bin/env node --harmony
'use strict';

var program = require('commander'),
  _ = require('lodash'),
  co = require('co'),
  prompt = require('co-prompt'),
  chalk = require('chalk'),
  autostyles = require('../index.js'),
  StyleGuide = autostyles,
  folder,
  config;

program
    .command('styles', 'Create style guide.')
    .arguments('<dir>')
    .option('-l --log <log>', 'Turns debug on')
    .option('-s --source <source>', 'Source folder containing css files')
    .option('-o --output <output>', 'Destination folder final guide files')
    .action(function (dir) {
      folder = dir;

      co(function *() {
        var source = yield prompt(chalk.bold.blue('Source folder: ')),
          destination = yield prompt(chalk.bold.blue('Destination folder: '));

          // Gather the options
          config = {
            debug: program.log || false,
            source: program.source || source || './css',
            output: (_.isEmpty(folder)) ? '' : folder + '/' + (program.output || destination || 'dist')
          };

        console.log('\n== Style Guide Settings ==');
        console.log('Debug: ', chalk.underline.yellow(program.log), '\n');
        console.log('Output Folder: ', chalk.underline.yellow(config.output));
        console.log('Source Folder: ', chalk.underline.yellow(config.source));

        process.stdin.pause();
        new StyleGuide(config);
      });
    })
    .parse(process.argv);

// Display error message & exit if no folder is specified
if (_.isEmpty(folder)) {
   console.log(chalk.bold.red('\nYou must specifiy a folder name for your final guide (i.e. MyStyleGuide).'));
   process.exit(1);
}

// Show help if no arguments provided
if (!program.args.length) {
  program.help();
}
