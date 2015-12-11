'use strict';

var _ = require('lodash'),
  path = require('path'),
  root = require('root-path'),
  fs = require('fs-extra'),
  chalk = require('chalk'),
  walk = require('simple-walk'),
  css = require('css'),
  // formattor = require('formattor'),
  nunjucks = require('nunjucks'),
  // env = new nunjucks.Environment(),
  debug = false,
  extraFields = ['type', 'position'],
  StyleGuide;

// Prints an message & value
function logMsg(msg, value) {
  if (debug) {
    console.log(chalk.bold.gray('%s\n'), msg);
    console.log(chalk.gray('%j\n'), value);
  }
}
// Prints an object
function log(o) {
  if (debug) {
    // console.log(chalk.gray(formattor(o, {method: 'json'})));
    separator('Object');
    console.log(chalk.gray('%j\n'), o);
  }
}
// Prints a separator
function separator(title) {
  if (debug) {
    console.log(chalk.gray('%s%s%s'), _.repeat('=', 10), title ,_.repeat('=', 10));
  }
}

// Accepts in arguments of files
StyleGuide = function (config) {
  this.templates  = 'templates';
  this.source = config.source;
  this.output = config.output;
  debug = config.debug;

  this.setTempTemplates();
  this.setFiles();
};

// Read the css file
StyleGuide.prototype.getFile = function (source) {
  separator('START');
  logMsg('\n1) Get the file from ', source);
  return fs.readFileSync(source, 'utf8');
};

// Parse the CSS file
StyleGuide.prototype.getParsedCss = function (source) {
  var file = this.getFile(source);

  logMsg('1a) Parsed Css', source);
  return file ? css.parse(file) : '';
};

// Map the data to the format we would like
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

    logMsg('2) Mapped these items:  ', item.selectors);
  });

}

StyleGuide.prototype.getData = function (data) {
  var styles = _.chain(data)
  .map(function (item) {
    return _.omit(item, extraFields);
  })
  .tap(addInfo)
  .tap(log)
  .value();

  logMsg('3) Retrieved Data: ', styles[0].selectors[0]);

  return styles;
};

StyleGuide.prototype.setTempTemplates = function () {
  fs.copySync(path.resolve(__dirname, this.templates), path.join(process.cwd(), '_' + this.templates));
}

// Set files
StyleGuide.prototype.setFiles = function () {

  var fileIndex,
    myCss,
    data,
    link,
    menu = [],
    files = walk.match(this.source, /(\.css)$/gi) || [];

  for (fileIndex in files) {
    if (files.hasOwnProperty(fileIndex)) {
      link = path.basename(files[fileIndex]);
      myCss = this.getParsedCss(files[fileIndex]);
      data = this.getData(myCss.stylesheet.rules);
      menu.push(link);

      logMsg('4) Create html page for ', link);
      this.render(fileIndex, path.join(this.templates, 'page.tpl'), {title: link, rules: data});
    }
  }

  // Render first page
  logMsg('4a) Create index page with links ', menu);
  this.render('', path.join(this.templates, 'index.tpl'), {menu: menu});
};


// Copies module & project css
StyleGuide.prototype.copyFiles = function () {
  // Copy css folder with autostyles module css
  fs.copySync(path.resolve(__dirname, 'app'), path.join(this.output, 'css'));
  // Copy css folder containing the project files
  fs.copySync(this.source, path.join(this.output, 'css'));

  logMsg('5) Copy Files to ', this.output);
};

// Write out file to specified folder
StyleGuide.prototype.writeFiles = function (filename, content) {
  logMsg('5a) Write Files', filename);

  fs.outputFile(filename, content, function (err) {
    if (err) {
      console.log('Error: ', err);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
};

// Output rendered file
StyleGuide.prototype.render = function (index, filename, data) {
  var self = this,
    file;

  nunjucks.render('_' + filename, data, function (err, res) {
    if (err) {
      console.error(chalk.bold.underline.red(filename), 'in ' + chalk.yellow('_' + filename), '\n' + err.stack);
      process.exit(1);
    } else {
      file = filename.replace(self.templates, self.output).replace('.tpl', index + '.html');
      self.copyFiles(self.source, self.output);
      self.writeFiles(file, res);
    }
  });

  logMsg('6) Output the rendered file ', filename);
};

function removeTempTemplates() {
  fs.removeSync(path.join(process.cwd(), '_templates'));
};

// Remove the temp templates folder
process.on('exit', function() {
  console.log(chalk.bold.green('Your guide was successfully created.'));
  removeTempTemplates();
});


module.exports = StyleGuide;
