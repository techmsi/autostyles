#! /usr/bin/env node
var program = require('commander'),
    chalk = require('chalk'),
    autostyles = require('../index.js'),
    StyleGuide = autostyles;

program
    .command('styles', 'Create style guide.')
    .option('-l --log [log]', 'Turns debug on')
    .option('-s --source [source]', 'Source folder containing css files')
    .option('-o --output [output]', 'Destination folder final guide files')
    .action(function (options) {
      var config = {
        debug: program.log || false,
        source: program.source || './css',
        output: program.output || 'dist'
      };

      console.log('\n== Style Guide Settings ==');
      console.log('Debug: ', chalk.underline.yellow(program.log), '\n');
      console.log('Output Folder: ', chalk.underline.yellow(program.source));
      console.log('Source Folder: ', chalk.underline.yellow(program.output));

      new StyleGuide(config);
    });

program.parse(process.argv);

// Show help if no arguments provided
if (!program.args.length) {
  program.help();
}
