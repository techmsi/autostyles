'use strict';

var _ = require('lodash'),
  fs = require('fs-extra'),
  css = require('css'),
  formattor = require('formattor'),
  nunjucks = require('nunjucks'),
  env = new nunjucks.Environment(),
  config = require('./config.json'),
  extraFields = ['type', 'position'];

// Read the css file
function getFile(source) {
  return fs.readFileSync(source, 'utf8');
}

// Parse the CSS file
function getParsedCss(source) {
  var file = getFile(source);
  return (file) ? css.parse(file) : '';
}

// Output rendered file
function render(index, filename, data) {
  var res = nunjucks.render(filename, data),
      file = filename.replace(config.templates, config.output).replace('.tpl', index + '.html');

  // Copy css folder with autostyles module css
  fs.copySync('./app', config.output + 'css');
  // Copy css folder containing your project files
  fs.copySync('./css', config.output + 'css');

  // Write out file to specified folder
  fs.outputFile(file, res, function (err) {
    if (err) {
      return console.log(err);
    }

    logMsg('Outputted file', filename);
  });

}

// For easy logging
function logMsg(msg, value) {
  if (config.debug) {
    console.log('%s\n%j\n', msg, value);
  }
}

function log(o) {
  if (config.debug) {
    // console.log(formattor(o, {method: 'json'}));
    console.log('%j\n', o);
  }
}

function getData(data) {
  var styles = _.chain(data)
  .map(function (item) {
    return _.omit(item, extraFields);
  })
  .tap(addInfo)
  .tap(log)
  .value();

  return styles;
}

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

function createGuide() {
  // Render first page
  render('', config.templates + 'index.tpl', {menu:config.files});

  for ( var fileIndex in config.files) {
    var myCss = getParsedCss(config.source + config.files[fileIndex]),
      data = getData(myCss.stylesheet.rules);

    render(fileIndex, config.templates + 'page.tpl', {title: config.files[fileIndex], rules: data});
  }
  return true;
}

module.exports = createGuide;
