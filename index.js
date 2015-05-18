'use strict';

var _ = require('lodash'),
  fs = require('fs-extra'),
  css = require('css'),
  formattor = require('formattor'),
  nunjucks = require('nunjucks'),
  env = new nunjucks.Environment(),
  config = require('./config.json'),
  extraFields = ['type', 'position'];


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

// Accepts in arguments of files
var StyleGuide = function (files) {
  // Render first page
  this.render('', config.templates + 'index.tpl', {menu:files});

  for ( var fileIndex in files) {
    var myCss = this.getParsedCss(config.source + files[fileIndex]),
      data = this.getData(myCss.stylesheet.rules);

    this.render(fileIndex, config.templates + 'page.tpl', {title: config.files[fileIndex], rules: data});
  }

};

// Read the css file
StyleGuide.prototype.getFile = function(source){
  return fs.readFileSync(source, 'utf8');
};

StyleGuide.prototype.copyFiles = function(){
  // Copy css folder with autostyles module css
  fs.copySync('./app', config.output + 'css');

  // Copy css folder containing your project files
  fs.copySync(config.source, config.output + 'css');
};

// Write out file to specified folder
StyleGuide.prototype.writeFiles = function (filename, content){
  fs.outputFile(filename, content, function (err) {
    if (err) {
      return console.log(err);
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
      file = filename.replace(config.templates, config.output).replace('.tpl', index + '.html');

  this.copyFiles();
  this.writeFiles(file, res);
}


StyleGuide.prototype.getData = function (data) {
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

module.exports = StyleGuide;
