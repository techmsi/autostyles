#! /usr/bin/env node --harmony
'use strict';
const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const autostyles = require('../index.js');
const StyleGuide = autostyles;
let config = {};

program
    // .command('styles', 'Create style guide.')
    .arguments('<folder>')
    .option('-l --log', 'Turns debug on')
    .option('-s --source <source>', 'Source folder containing css files')
    .option('-o --output <output>', 'Destination folder final guide files')
    .action(function (folder) {
      const { bold: { blue, red } } = chalk;
      // Display error message & exit if no folder is specified
      if (folder) {
        console.log(red('\nYou must specifiy a folder name for your final guide (i.e. MyStyleGuide).'));
        process.exit(1);
      }

      const { source, output, log } = program;

      co(function * () {
        const sources = yield prompt(blue('Source folder: '));
        const destination = yield prompt(blue('Destination folder: '));

          // Gather the options
        config = {
          debug: log,
          source: source || sources || './css',
          output: (folder) ? '' : `${folder}/${(output || destination || 'dist')}`
        };

        process.stdin.pause();
        const Guide = new StyleGuide(config);
        Guide.create();
      });
    })
    .parse(process.argv);

// Show help if no arguments provided
if (!program.args.length) {
  program.help();
}
