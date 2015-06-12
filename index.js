'use strict';

var _ = require('lodash'),
  path = require('path'),
  fs = require('fs-extra'),
  walk = require('simple-walk'),
  css = require('css'),
  formattor = require('formattor'),
  nunjucks = require('nunjucks'),
  env = new nunjucks.Environment(),
  debug = false,
  extraFields = ['type', 'position'];


// For easy logging
function logMsg(msg, value) {
  if (debug) {
    console.log('%s\n%j\n', msg, value);
  }
}

function log(o) {
  if (debug) {
    // console.log(formattor(o, {method: 'json'}));
    console.log('%j\n', o);
  }
}

// Accepts in arguments of files
var StyleGuide = function (config) {
  this.templates  = 'templates';
  this.source = config.source;
  this.output = config.output;
  debug = config.debug;

  console.log(config);

  this.setFiles();
};
// Set files
StyleGuide.prototype.setFiles = function () {

  var fileIndex,
      myCss,
      data,
      link,
      menu = [],
      files = walk.match(this.source, /(\.css)$/gi) || [];


  for (fileIndex in files) {
    link = files[fileIndex].replace(this.source + '/', '');
    myCss = this.getParsedCss(files[fileIndex]);
    data = this.getData(myCss.stylesheet.rules);
    menu.push(link);

    this.render(fileIndex, path.join(this.templates, 'page.tpl'), {title: link, rules: data});
  }

  // Render first page
  this.render('', path.join(this.templates, 'index.tpl'), {menu: menu});
};

// Read the css file
StyleGuide.prototype.getFile = function (source) {
  return fs.readFileSync(source, 'utf8');
};

StyleGuide.prototype.copyFiles = function () {
  // Copy css folder with autostyles module css
  fs.copySync('./app', path.join(this.output, 'css'));

  // Copy css folder containing the project files
  fs.copySync(this.source, path.join(this.output, 'css'));
};

// Write out file to specified folder
StyleGuide.prototype.writeFiles = function (filename, content){
  fs.outputFile(filename, content, function (err) {
    if (err) {
      console.log(chalk.red('Error: ' + err));
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
};

// Parse the CSS file
StyleGuide.prototype.getParsedCss = function (source) {
  var file = this.getFile(source);
  return (file) ? css.parse(file) : '';
};

// Output rendered file
StyleGuide.prototype.render = function (index, filename, data) {
  var res = nunjucks.render(filename, data),
      file = filename.replace(this.templates, this.output).replace('.tpl', index + '.html');

  this.copyFiles(this.source, this.output);
  this.writeFiles(file, res);
};


StyleGuide.prototype.getData = function (data) {
  var styles = _.chain(data)
  .map(function (item) {
    return _.omit(item, extraFields);
  })
  .tap(addInfo)
  .tap(log)
  .value();

  return styles;
};

function addInfo(items) {
  return _.map(items, function (item) {

    item.selectors = _.map(item.selectors, function (selectorItem) {
      var value = selectorItem.split('.'),
          selector = value[0],
          state = value[1] || 'none';

      return {
        selector: selector,
        state: state
      };
    });

    item.declarations = _.map(item.declarations, function (item) {
      return _.omit(item, extraFields);
    });


  });

}

module.exports = StyleGuide;
